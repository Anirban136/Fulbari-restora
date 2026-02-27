"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Coffee, Wine, Cake, X, Leaf } from "lucide-react";
import { type Category } from "@/data/menu";
import { sanitizeImageUrl } from "@/lib/utils";

// Category configuration with icons and precise database mapping
const categoryConfig = [
    {
        icon: Utensils,
        label: "Main Course",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=400&auto=format&fit=crop",
        menuCategories: ["Indian Main Course"] as Category[],
        menuType: "RESTAURANT",
    },
    {
        icon: Coffee,
        label: "Breakfast",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=400&auto=format&fit=crop",
        menuCategories: ["breakfast"] as Category[],
        menuType: "CAFE",
    },
    {
        icon: Wine,
        label: "Drinks",
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&auto=format&fit=crop",
        menuCategories: ["Beverages"] as Category[],
        // Any menu type
    },
    {
        icon: Cake,
        label: "Desserts",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400&auto=format&fit=crop",
        menuCategories: ["Desserts", "Ice Cream"] as Category[],
        menuType: "RESTAURANT",
    },
];

export function Specialties() {
    const [selectedCategory, setSelectedCategory] = useState<typeof categoryConfig[number] | null>(null);
    const [liveMenu, setLiveMenu] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/menu")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setLiveMenu(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load live menu for specialties", err);
                setLoading(false);
            });
    }, []);

    // Dynamically calculate counts and filter items
    const categoriesWithCounts = useMemo(() => {
        return (categoryConfig as any[]).map(cat => {
            const items = liveMenu.filter(item => {
                const categoryMatch = (cat.menuCategories as string[]).includes(item.category);
                const typeMatch = cat.menuType ? item.menu_type === cat.menuType : true;
                return categoryMatch && typeMatch && item.available !== false;
            });
            return {
                ...cat,
                count: items.length > 0 ? `${items.length}+ Items` : "Items coming soon",
                items: items
            };
        });
    }, [liveMenu]);

    const activeCategoryData = selectedCategory
        ? categoriesWithCounts.find(c => c.label === selectedCategory.label)
        : null;

    const filteredItems = activeCategoryData?.items || [];

    return (
        <>
            <section className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
                {/* Abstract background accents */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
                        {/* Left Content - The "Wow" Side */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col"
                        >
                            <div className="inline-flex items-center gap-2 mb-4 group cursor-default">
                                <div className="w-8 h-[1px] bg-primary/60 group-hover:w-12 transition-all duration-500" />
                                <span className="text-primary font-heading italic text-sm md:text-base tracking-widest uppercase">Our Categories</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-heading mb-8 tracking-tight leading-tight">
                                Explore Our <span className="text-primary">Cuisine</span>
                            </h2>

                            <div className="space-y-8 relative">
                                {/* Premium Bengali Callout */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="relative p-6 md:p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-card/50 to-background border border-primary/20 backdrop-blur-xl shadow-2xl overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

                                    <p className="text-foreground font-bengali-logo text-lg md:text-2xl leading-relaxed font-bold italic relative z-10 text-pretty">
                                        চাইনিজ, তন্দুরি থেকে শুরু করে ইন্ডিয়ার—প্রতিটি পদ আমাদের অভিজ্ঞ শেফদের নিপুণ হাতের ছোঁয়ায় তৈরি। আমাদের বিশেষ চিকেন রেশমি বাটার মাসালা এবং জিভে জল আনা তন্দুরি আইটেমগুলো চেখে দেখতে ভুলবেন না।
                                    </p>
                                </motion.div>

                                <div className="space-y-6 pl-2">
                                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                                        Experience a <span className="italic text-foreground font-medium">"Proshantir Neer"</span> (Tranquility&apos;s Home) with our culinary delights. Don&apos;t miss our signature <span className="text-primary font-black border-b border-primary/30">Chicken Reshmi Butter Masala</span> and our mouth-watering Tandoori specialties, crafted by experienced chefs.
                                    </p>

                                    {/* Secondary Bengali Info Card */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm group hover:border-primary/30 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                                            <Utensils size={18} className="text-primary" />
                                        </div>
                                        <p className="text-muted-foreground font-bengali font-medium italic text-sm md:text-base leading-relaxed">
                                            জিভে জল আনা স্বাদ: আমাদের অভিজ্ঞ শেফরা ইন্ডিয়ান, চাইনিজ এবং তন্দুরি খাবারের এক বিশাল সমাহার পরিবেশন করেন। আমাদের সিগনেচার চিকেন রেশমি বাটার মাসালা এবং ধোঁয়া ওঠা তন্দুরি কাবাব প্রতিবারই গ্রাহকদের মন জয় করে নেয়।
                                        </p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Main Featured Image with Overlay Effect */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="mt-12 group relative"
                            >
                                <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl group-hover:bg-primary/10 transition-colors duration-700" />

                                <div className="relative h-[280px] md:h-[380px] lg:h-[420px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                                    <Image
                                        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2074&auto=format&fit=crop"
                                        alt="Varieties of food served at Fulbari"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <span className="inline-block bg-primary px-5 py-2 rounded-full text-primary-foreground text-xs md:text-sm font-black uppercase tracking-[0.2em] shadow-lg mb-4">
                                                Multi-Cuisine Specialties
                                            </span>
                                            <p className="text-white/80 text-xs md:text-sm font-medium max-w-sm">
                                                A curated journey through the finest flavors of Asia and the subcontinent.
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Floating Button */}
                                <div className="absolute -bottom-6 -right-6 md:right-8 lg:-right-10 z-20">
                                    <Link href="/menu">
                                        <button className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary text-primary-foreground flex flex-col items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.4)] hover:scale-110 hover:rotate-12 transition-all duration-500 group/btn border-4 border-background">
                                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter mb-1 opacity-80">Check Our</span>
                                            <span className="text-sm md:text-lg font-black font-heading leading-tight">Menu</span>
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Visual Categories Grid */}
                        <div className="lg:pt-20">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
                            >
                                {categoriesWithCounts.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        onClick={() => setSelectedCategory(item)}
                                        className="bg-card/40 rounded-3xl overflow-hidden hover:bg-primary/10 border border-border/50 hover:border-primary/40 transition-all duration-500 cursor-pointer group backdrop-blur-sm shadow-xl"
                                    >
                                        {/* Category Thumbnail */}
                                        <div className="relative h-36 md:h-44 overflow-hidden">
                                            <img
                                                src={sanitizeImageUrl(item.image)}
                                                alt={item.label}
                                                loading={i === 0 ? "eager" : "lazy"}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                                            {/* Icon Floating Overlay */}
                                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/60 backdrop-blur-md flex items-center justify-center text-primary border border-white/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                <item.icon size={20} />
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h4 className="font-black font-heading text-lg md:text-xl mb-1 group-hover:text-primary transition-colors">{item.label}</h4>
                                            {loading ? (
                                                <div className="h-3 w-16 bg-primary/10 animate-pulse rounded mt-1" />
                                            ) : (
                                                <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.count}</span>
                                            )}

                                            {/* Simple underline accent */}
                                            <div className="w-6 h-1 bg-primary/20 mt-4 rounded-full group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Popup Modal */}
            <AnimatePresence mode="wait">
                {selectedCategory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedCategory(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ duration: 0.3, type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className="relative h-40 md:h-48 overflow-hidden">
                                <Image
                                    src={sanitizeImageUrl(selectedCategory.image)}
                                    alt={selectedCategory.label}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                                <div className="absolute bottom-4 left-6 z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                            <selectedCategory.icon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold font-heading text-foreground">{selectedCategory.label}</h3>
                                            <p className="text-sm text-muted-foreground">{activeCategoryData?.count}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-colors z-20 cursor-pointer"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Items List */}
                            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(85vh-12rem)] custom-scrollbar">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {filteredItems.map((item: any, index: number) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex gap-4 p-3 rounded-xl bg-background border border-border/30 hover:border-primary/30 hover:shadow-md transition-all group"
                                        >
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                <img
                                                    src={sanitizeImageUrl(item.image)}
                                                    alt={item.name}
                                                    loading="lazy"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        console.error(`Specialty item image failed: ${target.src}`);
                                                        target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
                                                    {item.isVeg && (
                                                        <Leaf size={12} className="text-green-500 shrink-0" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">{item.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-primary font-bold text-sm">₹{item.price}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {filteredItems.length === 0 && (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <p>No items found in this category.</p>
                                    </div>
                                )}

                                {/* View Full Menu Link */}
                                <div className="mt-6 text-center">
                                    <Link href="/menu" onClick={() => setSelectedCategory(null)}>
                                        <Button variant="outline" size="sm">View Full Menu →</Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
