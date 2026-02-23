"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-background">

            {/* ===== DESKTOP HERO (md and up) ===== */}
            <div className="hidden md:block">
                {/* Full-screen image container — no height cap so the full photo is visible */}
                <div className="relative w-full" style={{ minHeight: '90vh' }}>

                    {/* Hero Image — covers full area, object-center so nothing is cropped */}
                    <Image
                        src="/hero-bg.jpg"
                        alt="Fulbari Restaurant Exterior Night View"
                        fill
                        className="object-cover object-center"
                        priority
                    />

                    {/* Subtle dark vignette around edges for focus */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

                    {/* Bottom fade into background */}
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />

                    {/* Text — centered in the lower-middle area, below the sign */}
                    <div className="absolute inset-0 flex items-center justify-center pt-16">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.3 }}
                            className="text-center px-6 max-w-3xl"
                        >
                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                className="text-primary font-bengali-logo font-bold italic text-lg xl:text-2xl mb-5 drop-shadow-lg tracking-wide"
                            >
                                ফুলবাড়ি রেস্তোরাঁ: প্রকৃতির সান্নিধ্যে এক অনন্য স্বাদের ঠিকানা
                            </motion.p>

                            <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-5 leading-tight drop-shadow-2xl">
                                Experience{" "}
                                <span className="text-primary drop-shadow-lg">Authentic</span>
                                <br />
                                Flavors &amp; Ambiance
                            </h1>

                            <p className="text-white/80 text-base lg:text-lg xl:text-xl mb-8 font-light max-w-xl mx-auto drop-shadow-md leading-relaxed">
                                A perfect blend of traditional Bengali cuisine and modern dining in the heart of Serampore.
                            </p>

                            <div className="flex gap-4 justify-center">
                                <Link href="/menu">
                                    <Button size="lg" className="text-sm px-8 shadow-2xl shadow-primary/40">
                                        View Menu
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="text-sm px-8 border-white/50 text-white hover:bg-white/15 backdrop-blur-sm shadow-xl"
                                    >
                                        Book a Table
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ===== MOBILE HERO (below md) ===== */}
            <div className="md:hidden">
                <div className="relative w-full pt-14">
                    <Image
                        src="/hero-bg.jpg"
                        alt="Fulbari Restaurant Exterior Night View"
                        width={1024}
                        height={768}
                        className="w-full h-auto"
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="px-5 pb-10 -mt-6 relative z-10"
                >
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
                        Experience <span className="text-primary">Authentic</span> <br />
                        Flavors &amp; Ambiance
                    </h1>
                    <p className="text-primary font-bengali-logo font-bold italic text-sm mb-4 drop-shadow-sm">
                        ফুলবাড়ি রেস্তোরাঁ: প্রকৃতির সান্নিধ্যে এক অনন্য স্বাদের ঠিকানা
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-5 font-light max-w-md">
                        A perfect blend of traditional Bengali cuisine and modern dining in the heart of Serampore.
                    </p>
                    <div className="flex gap-3">
                        <Link href="/menu">
                            <Button size="sm" className="text-sm">
                                View Menu
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="sm" variant="outline" className="text-sm">
                                Book a Table
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
