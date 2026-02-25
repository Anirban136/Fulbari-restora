"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Utensils, Coffee, Building2, PartyPopper, Users, Clock, MapPin, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type VenueKey = "restaurant" | "cafe" | "community" | "banquet";

const venues = {
    restaurant: {
        icon: Utensils,
        label: "Restaurant",
        tagline: "Nature's Palette on Your Plate",
        bengaliTagline: "প্রকৃতির সান্নিধ্যে এক অনন্য স্বাদের ঠিকানা",
        description:
            "Our lush open-air garden dining offers a truly exceptional experience. Spend memorable moments with loved ones under the open sky amidst sparkling illumination.",
        bengaliDescription: "আমাদের সবুজ ঘেরা ওপেন-এয়ার গার্ডেন ডাইনিং আপনাকে দেবে এক অসাধারণ অভিজ্ঞতা। খোলা আকাশের নিচে ঝকঝকে আলোকসজ্জার মাঝে প্রিয়জনের সাথে কাটানো সময় হবে সত্যিই স্মরণীয়।",
        highlights: ["Open-Air Garden Dining", "Live Band ('Nostalgic')", "Chicken Reshmi Butter Masala", "Traditional Bengali Thalis"],
        capacity: "120+ Guests",
        timing: "11:00 AM - 10:30 PM",
        images: [
            "/restaurant/r1.jpg",
            "/restaurant/r2.jpg",
            "/restaurant/r3.jpg",
            "/restaurant/r4.jpg",
            "/restaurant/r5.jpg",
        ],
    },
    cafe: {
        icon: Coffee,
        label: "Café",
        tagline: "Brews, Bites & Bliss",
        description:
            "Unwind with freshly brewed coffee, artisan teas, and light bites in our cozy café corner. Perfect for casual meetups, steady work sessions, or a quiet escape.",
        highlights: ["Specialty Coffee", "Fresh Pastries", "Free High-Speed Wi-Fi", "Cozy Modern Ambience"],
        capacity: "40+ Guests",
        timing: "8:00 AM - 9:00 PM",
        images: [
            "/cafe/cafe1.jpeg",
            "/cafe/cafe2.jpeg",
            "/cafe/cafe3.jpeg",
            "/cafe/cafe4.jpeg",
        ],
    },
    community: {
        icon: Building2,
        label: "Community Hall",
        tagline: "Where Moments Become Memories",
        description:
            "Our spacious community hall is ideal for cultural events, seminars, and social gatherings. Equipped with modern amenities and flexible arrangements.",
        highlights: ["Projector & Sound", "Flexible Seating", "Full AC Hall", "Professional Stage"],
        capacity: "300+ Guests",
        timing: "Contact for Inquiry",
        images: [
            "/community/community4.jpeg",
            "/community/community2.jpeg",
            "/community/community3.jpeg",
            "/community/community1.jpeg",
            "/community/community5.jpeg",
        ],
    },
    banquet: {
        icon: PartyPopper,
        label: "Food & Events",
        tagline: "Exquisite Celebrations",
        description:
            "From grand weddings to intimate parties, we provide an elegant setting with premium catering, stunning décor, and dedicated coordination.",
        highlights: ["Wedding Packages", "Themed Décor", "Premium Catering", "Dedicated Manager"],
        capacity: "500+ Guests",
        timing: "Contact for Inquiry",
        images: [
            "/food/food3.jpeg",
            "/food/food2.jpeg",
            "/food/food1.jpeg",
            "/food/food4.jpeg",
            "/food/food5.jpeg",
        ],
    },
};

function VenueImageSlider({ images, label }: { images: string[], label: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isPaused, currentIndex, images.length]);

    return (
        <div
            className="relative group overflow-hidden rounded-[2rem] shadow-2xl h-[300px] md:h-[480px] lg:h-[560px] touch-pan-y border border-white/10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`${label} - ${currentIndex + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority={currentIndex === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Glass Navigation */}
            <div className="absolute inset-0 flex items-center justify-between p-4 md:p-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-primary hover:border-primary transition-all active:scale-95 pointer-events-auto shadow-2xl"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-primary hover:border-primary transition-all active:scale-95 pointer-events-auto shadow-2xl"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Minimal Indicators */}
            <div className="absolute bottom-8 left-8 flex gap-2 z-30">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-500",
                            idx === currentIndex ? "bg-primary w-8 shadow-[0_0_15px_rgba(255,184,0,0.5)]" : "bg-white/30 w-3 hover:bg-white/50"
                        )}
                    />
                ))}
            </div>

            <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-lg border border-white/10 text-white/90 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">
                {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
        </div>
    );
}

export function About() {
    const [activeVenue, setActiveVenue] = useState<VenueKey>("restaurant");
    const current = venues[activeVenue];

    return (
        <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                    {/* Left Side: Dynamic Content */}
                    <div className="w-full lg:w-5/12 order-2 lg:order-1">
                        <header className="mb-10 lg:mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4"
                            >
                                <Sparkles size={14} /> Discovery
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight"
                            >
                                Experience <span className="text-primary italic">Fulbari</span>
                            </motion.h2>

                            {/* Modern Tab Switcher */}
                            <div className="flex flex-wrap gap-2 p-1.5 bg-card/50 border border-border/50 rounded-2xl backdrop-blur-md mb-8">
                                {(Object.keys(venues) as VenueKey[]).map((key) => {
                                    const venue = venues[key];
                                    const isActive = activeVenue === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setActiveVenue(key)}
                                            className={cn(
                                                "relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 z-10",
                                                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <venue.icon size={16} />
                                            {venue.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </header>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeVenue}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground tracking-tight">
                                        {current.label}
                                        <span className="block text-primary text-sm font-medium tracking-widest uppercase mt-2 opacity-80">
                                            {current.tagline}
                                        </span>
                                    </h3>

                                    <div className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                                            {current.description}
                                        </p>

                                        {activeVenue === "restaurant" && (
                                            <div className="p-6 rounded-2xl bg-primary/5 border-l-4 border-primary/50 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
                                                    <Utensils size={48} />
                                                </div>
                                                <p className="font-bengali text-lg leading-relaxed text-foreground font-bold italic">
                                                    {current.bengaliDescription}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modern Highlight Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {current.highlights.map((item, i) => (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 + (i * 0.05) }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/40 hover:border-primary/30 transition-colors group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                <Star size={14} fill="currentColor" />
                                            </div>
                                            <span className="text-sm font-bold tracking-tight">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Info Bar */}
                                <div className="flex flex-wrap gap-3 pt-8">
                                    {[
                                        { icon: Users, label: current.capacity },
                                        { icon: Clock, label: current.timing },
                                        { icon: MapPin, label: "Serampore" }
                                    ].map((info, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2.5 px-4 py-2 bg-accent/40 backdrop-blur-md rounded-full border border-border/40 text-xs font-bold uppercase tracking-wider"
                                        >
                                            <info.icon size={14} className="text-primary" />
                                            {info.label}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Visual Showcase */}
                    <div className="w-full lg:w-7/12 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <VenueImageSlider images={current.images} label={current.label} />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
