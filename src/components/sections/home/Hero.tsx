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
                {/* Image container - constrained height on large screens */}
                <div className="relative w-full pt-16">
                    <div className="relative w-full max-h-[78vh] overflow-hidden">
                        <Image
                            src="/hero-bg.jpg"
                            alt="Fulbari Restaurant Exterior Night View"
                            width={1920}
                            height={1080}
                            className="w-full h-auto max-h-[78vh] object-cover object-center"
                            priority
                        />
                        {/* Bottom gradient fade */}
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
                    </div>
                </div>

                {/* Desktop Text - Below the image, centered max-width */}
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-12 md:pb-16 -mt-20 lg:-mt-24 xl:-mt-28 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl text-left"
                    >
                        <h1 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 leading-tight">
                            Experience <span className="text-primary">Authentic</span> <br />
                            Flavors &amp; Ambiance
                        </h1>
                        <p className="text-primary font-bengali-logo font-bold italic text-base lg:text-lg xl:text-xl mb-5 tracking-wide drop-shadow-sm">
                            ফুলবাড়ি রেস্তোরাঁ: প্রকৃতির সান্নিধ্যে এক অনন্য স্বাদের ঠিকানা
                        </p>
                        <p className="text-muted-foreground text-sm lg:text-base xl:text-lg mb-6 font-light max-w-lg">
                            A perfect blend of traditional Bengali cuisine and modern dining in the heart of Serampore.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/menu">
                                <Button size="lg" className="text-sm px-6">
                                    View Menu
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ===== MOBILE HERO (below md) ===== */}
            <div className="md:hidden">
                {/* Full image at natural aspect ratio */}
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

                {/* Mobile Text below image */}
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
