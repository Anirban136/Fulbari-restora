"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-background">
            {/* Image shown at full natural ratio — no cropping, same on mobile and desktop */}
            <div className="relative w-full pt-14 md:pt-16">
                <Image
                    src="/hero-bg.jpg"
                    alt="Fulbari Restaurant Exterior Night View"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    priority
                />
                {/* Bottom gradient fade into page */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Text section below the image — same style as mobile */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="px-5 md:px-16 lg:px-24 xl:px-32 pb-10 md:pb-14 -mt-10 md:-mt-16 lg:-mt-20 relative z-10 max-w-7xl mx-auto"
            >
                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
                    Experience <span className="text-primary">Authentic</span> <br />
                    Flavors &amp; Ambiance
                </h1>
                <p className="text-primary font-bengali-logo font-bold italic text-sm md:text-base lg:text-lg mb-4 drop-shadow-sm">
                    ফুলবাড়ি রেস্তোরাঁ: প্রকৃতির সান্নিধ্যে এক অনন্য স্বাদের ঠিকানা
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-5 font-light max-w-xl">
                    A perfect blend of traditional Bengali cuisine and modern dining in the heart of Serampore.
                </p>
                <div className="flex gap-3 md:gap-4">
                    <Link href="/menu">
                        <Button size="sm" className="text-sm md:text-base md:px-6 md:py-3">
                            View Menu
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="sm" variant="outline" className="text-sm md:text-base md:px-6 md:py-3">
                            Book a Table
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
