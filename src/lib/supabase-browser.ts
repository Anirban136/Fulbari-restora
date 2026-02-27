/**
 * Client-side image compression utility.
 * Compresses images using Canvas API before uploading to avoid
 * Vercel's 4.5MB serverless function body size limit.
 *
 * Usage:
 *   const compressed = await compressImageForUpload(file);
 *   // Then POST `compressed` as FormData to /api/upload
 */

/**
 * Compresses an image file client-side using Canvas.
 * - Resizes to max 1920px on the longest side (1080px on mobile)
 * - Converts to JPEG at 0.85 quality (0.7 on mobile)
 * - Result is always well under 2MB, safe for /api/upload
 * - MOBILE FALLBACK: If Canvas fails, uses nearest available method (toDataURL, or returns original)
 */
export async function compressImageForUpload(file: File): Promise<File> {
    // early convert HEIC/HEIF files to JPEG so canvas can handle them
    if (/\.heic$/i.test(file.name) || /\.heif$/i.test(file.name) || file.type === 'image/heic' || file.type === 'image/heif') {
        console.log("[COMPRESS] Detected HEIC/HEIF file, attempting conversion to JPEG...");
        try {
            // lazy-load heic2any since it's large and only needed occasionally
            const heic2any = (await import('heic2any')).default;
            const conv = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.8 });
            const blob = conv instanceof Blob ? conv : (Array.isArray(conv) ? conv[0] : conv) as Blob;
            const newName = file.name.replace(/\.[^/.]+$/, '.jpg');
            file = new File([blob], newName, { type: 'image/jpeg', lastModified: Date.now() });
            console.log('[COMPRESS] HEIC conversion succeeded, new size:', file.size);
        } catch (err) {
            console.error('[COMPRESS] HEIC conversion failed, proceeding with original file', err);
        }
    }

    return new Promise((resolve, reject) => {
        // For non-image files, return as-is
        if (!file.type.startsWith('image/')) {
            console.log("[COMPRESS] Non-image file, returning as-is:", file.type);
            resolve(file);
            return;
        }

        // If file is already small, skip compression
        const sizeThreshold = (typeof window !== 'undefined' && window.innerWidth < 768) ? 300000 : 500000;
        if (file.size < sizeThreshold) {
            console.log("[COMPRESS] File already small (" + file.size + "b < " + sizeThreshold + "b), returning as-is");
            resolve(file);
            return;
        }

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        console.log("[COMPRESS] Starting compression - Mobile: " + isMobile + ", File size: " + file.size + "b");

        const img = new window.Image();
        const objectUrl = URL.createObjectURL(file);
        
        // Longer timeout on mobile
        const timeoutMs = isMobile ? 15000 : 10000;
        const timeout = setTimeout(() => {
            URL.revokeObjectURL(objectUrl);
            console.warn("[COMPRESS] Image load timeout (" + timeoutMs + "ms), using original file");
            resolve(file);
        }, timeoutMs);

        img.onload = () => {
            clearTimeout(timeout);
            URL.revokeObjectURL(objectUrl);

            try {
                const MAX_DIM = isMobile ? 1080 : 1920;
                let { naturalWidth: w, naturalHeight: h } = img;

                console.log("[COMPRESS] Image loaded, dimensions: " + w + "x" + h + ", Max: " + MAX_DIM);

                // Downscale if larger than MAX_DIM
                if (w > MAX_DIM || h > MAX_DIM) {
                    const originalW = w;
                    const originalH = h;
                    if (w > h) {
                        h = Math.round((h / w) * MAX_DIM);
                        w = MAX_DIM;
                    } else {
                        w = Math.round((w / h) * MAX_DIM);
                        h = MAX_DIM;
                    }
                    console.log("[COMPRESS] Downscaled from " + originalW + "x" + originalH + " to " + w + "x" + h);
                }

                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;

                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                if (!ctx) {
                    console.warn("[COMPRESS] Canvas 2D context not available, using original file");
                    resolve(file);
                    return;
                }

                // Draw image on canvas with white background
                console.log("[COMPRESS] Drawing on canvas (" + w + "x" + h + ")...");
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(img, 0, 0, w, h);
                console.log("[COMPRESS] Canvas draw complete");

                // Choose quality based on mobile
                const quality = isMobile ? 0.7 : 0.85;
                console.log("[COMPRESS] Using quality: " + quality);

                // Try toBlob first (preferred method)
                let callbackFired = false;

                canvas.toBlob(
                    (blob) => {
                        if (callbackFired) {
                            console.warn("[COMPRESS] Warning: toBlob callback fired multiple times");
                            return;
                        }
                        callbackFired = true;

                        try {
                            if (!blob) {
                                console.warn("[COMPRESS] toBlob returned null, trying dataURL fallback");
                                handleDataURLFallback();
                                return;
                            }

                            if (blob.size === 0) {
                                console.error("[COMPRESS] ERROR: toBlob created empty blob (0 bytes), trying dataURL fallback");
                                handleDataURLFallback();
                                return;
                            }

                            console.log("[COMPRESS] toBlob succeeded: " + blob.size + "b (original: " + file.size + "b)");
                            createFileFromBlob(blob);
                        } catch (error) {
                            console.error("[COMPRESS] Error in toBlob callback:", error);
                            handleDataURLFallback();
                        }
                    },
                    'image/jpeg',
                    quality
                );

                // Fallback if toBlob doesn't work (runs after brief delay to not interfere)
                const fallbackTimeout = setTimeout(() => {
                    if (!callbackFired) {
                        console.warn("[COMPRESS] toBlob callback didn't fire, using dataURL fallback");
                        handleDataURLFallback();
                    }
                }, isMobile ? 5000 : 2000); // give mobile more time for toBlob

                function handleDataURLFallback(): void {
                    clearTimeout(fallbackTimeout);
                    console.log("[COMPRESS] Using canvas.toDataURL fallback");
                    try {
                        const dataUrl = canvas.toDataURL('image/jpeg', quality);
                        if (!dataUrl || dataUrl === 'data:,') {
                            console.error("[COMPRESS] dataURL is empty, returning original file");
                            resolve(file);
                            return;
                        }

                        // Convert dataURL to blob
                        fetch(dataUrl)
                            .then(res => res.blob())
                            .then(blob => {
                                if (!blob || blob.size === 0) {
                                    console.error("[COMPRESS] dataURL blob is empty, returning original");
                                    resolve(file);
                                    return;
                                }
                                console.log("[COMPRESS] dataURL blob succeeded: " + blob.size + "b");
                                createFileFromBlob(blob);
                            })
                            .catch(err => {
                                console.error("[COMPRESS] dataURL fetch error:", err);
                                resolve(file);
                            });
                    } catch (error) {
                        console.error("[COMPRESS] dataURL fallback error:", error);
                        resolve(file);
                    }
                }

                function createFileFromBlob(blob: Blob) {
                    try {
                        const fileName = file.name.replace(/\.[^/.]+$/, '.jpg');
                        const compressedFile = new File([blob], fileName, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });

                        if (compressedFile.size === 0) {
                            console.error("[COMPRESS] ERROR: Created File has 0 bytes, returning original");
                            resolve(file);
                            return;
                        }

                        console.log("[COMPRESS] Final file created: " + compressedFile.size + "b, name: " + fileName);

                        // verify that the browser can actually decode the compressed result
                        verifyImage(compressedFile).then(valid => {
                            if (!valid) {
                                console.error("[COMPRESS] Compressed file cannot be decoded by the browser, falling back to original");
                                resolve(file);
                            } else {
                                resolve(compressedFile);
                            }
                        });
                    } catch (error) {
                        console.error("[COMPRESS] Error creating compressed file:", error);
                        resolve(file);
                    }
                }
            } catch (error) {
                console.error("[COMPRESS] Error during compression setup:", error);
                resolve(file);
            }
        };

        img.onerror = (error) => {
            clearTimeout(timeout);
            URL.revokeObjectURL(objectUrl);
            console.error("[COMPRESS] Image load error:", error);
            resolve(file);
        };

        // helper to verify a File can be decoded by the browser
        function verifyImage(testFile: File): Promise<boolean> {
            return new Promise((res) => {
                const img2 = document.createElement('img');
                const tmpUrl = URL.createObjectURL(testFile);
                let settled = false;
                img2.onload = () => { if (!settled) { settled = true; URL.revokeObjectURL(tmpUrl); res(true); } };
                img2.onerror = () => { if (!settled) { settled = true; URL.revokeObjectURL(tmpUrl); res(false); } };
                img2.src = tmpUrl;
                // give it a little time in case onload/onerror never fire
                setTimeout(() => { if (!settled) { settled = true; URL.revokeObjectURL(tmpUrl); res(false); } }, 5000);
            });
        }

        img.onabort = () => {
            clearTimeout(timeout);
            URL.revokeObjectURL(objectUrl);
            console.warn("[COMPRESS] Image load aborted");
            resolve(file);
        };

        // Critical: Set src last to trigger loading
        console.log("[COMPRESS] Setting image source...");
        img.src = objectUrl;
    });
}
