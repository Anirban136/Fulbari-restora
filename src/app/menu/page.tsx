"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Leaf, Utensils, Loader2, ArrowLeft, Star,
    Flame, Coffee, IceCream, Pizza, Soup, Beef, Sandwich,
    ChefHat, Clock, Sparkles, ChevronRight, X
} from "lucide-react";
import { cn, sanitizeImageUrl } from "@/lib/utils";

// Category Icon Mapping for Visual Grid
const categoryIconMap: Record<string, any> = {
    "All": Utensils,
    "Bengali": ChefHat,
    "Indian": Beef,
    "Chinese": Flame,
    "Starters": Sparkles,
    "Drinks": Coffee,
    "Desserts": IceCream,
    "Indian Main Course": Soup,
    "Chinese Main Course": Flame,
    "breakfast": Coffee,
    "Beverages": Coffee,
    "Ice Cream": IceCream,
    "Appetizers": Sparkles,
    "Biryani": Beef,
    "Tandoori": Flame,
    "Soups": Soup,
    "Bread": Sandwich,
    "Rice": Utensils,
    "Noodles": Utensils,
    "Tea & Coffee": Coffee,
    "Burgers & Sandwiches": Sandwich,
    "Snacks": Pizza,
    "Maggi & Pasta": Pizza,
    "Momo": Soup
};

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenuTab, setActiveMenuTab] = useState<"RESTAURANT" | "CAFE">("RESTAURANT");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        fetch("/api/menu")
            .then(res => res.json())
            .then(data => {
                setMenuItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load menu", err);
                setLoading(false);
            });
    }, []);

    const filteredByMenuType = useMemo(() =>
        menuItems.filter(item => (item.menu_type || "RESTAURANT") === activeMenuTab),
        [menuItems, activeMenuTab]);

    const categories = useMemo(() =>
        ["All", ...Array.from(new Set(filteredByMenuType.map(item => item.category)))],
        [filteredByMenuType]);

    useEffect(() => {
        if (activeCategory !== "All" && !categories.includes(activeCategory)) {
            setActiveCategory("All");
        }
    }, [activeMenuTab, categories, activeCategory]);

    const filteredItems = useMemo(() =>
        filteredByMenuType.filter((item) => {
            const isAvailable = item.available !== false;
            const matchesCategory = activeCategory === "All" || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return isAvailable && matchesCategory && matchesSearch;
        }),
        [filteredByMenuType, activeCategory, searchQuery]);

    const activeBgImage = activeMenuTab === "RESTAURANT"
        ? "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop";

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
            <Navbar />

            {/* Cinematic Hero Header */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={activeBgImage}
                        alt="Culinary Excellence"
                        fill
                        priority
                        className="object-cover opacity-40 brightness-[0.4]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
                </motion.div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/" className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 hover:text-white transition-all mb-8">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold tracking-widest uppercase">Home</span>
                        </Link>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-px w-8 bg-primary/40" />
                                <span className="text-primary font-heading italic text-lg tracking-[0.2em] uppercase">The Culinary Art</span>
                                <div className="h-px w-8 bg-primary/40" />
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tighter text-white">
                                OUR <span className="text-primary italic">MENU</span>
                            </h1>
                            <p className="text-muted-foreground/80 max-w-xl mx-auto text-xs md:text-sm uppercase tracking-[0.3em] font-black">
                                {activeMenuTab === "RESTAURANT"
                                    ? "Traditional Flavors & Fine Dining"
                                    : "Quick Bites & Comforting Sips"}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Ambient Glow */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full h-48 bg-background blur-3xl z-[5]" />
            </section>

            {/* Main Content Area */}
            <main className="relative z-10 -mt-20 container mx-auto px-4 md:px-8">

                {/* Menu Tab Switcher - Condensed & Modern */}
                <section className="flex justify-center mb-12">
                    <div className="inline-flex p-1.5 bg-card/80 border border-border/50 rounded-2xl backdrop-blur-xl shadow-2xl">
                        {(["RESTAURANT", "CAFE"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveMenuTab(tab)}
                                className={cn(
                                    "px-8 py-3.5 rounded-xl text-xs md:text-sm font-black tracking-widest uppercase transition-all duration-500",
                                    activeMenuTab === tab
                                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Brand Mission - Preserving Original Bengali */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-16 py-8 px-10 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Sparkles size={120} className="text-primary" />
                    </div>
                    <p className="font-bengali text-lg md:text-2xl font-black italic text-center leading-relaxed relative z-10">
                        {activeMenuTab === "RESTAURANT"
                            ? "\"ফুলবাড়ি রেস্তোরাঁতে আমরা কেবল খাবার পরিবেশন করি না, আমরা স্মৃতি তৈরি করি।\""
                            : "\"ফুলবাড়ি ক্যাফেতে প্রতিটি চুমুক এবং প্রতিটি কামড় আপনাকে তরতাজা করে তুলবে।\""
                        }
                    </p>
                </motion.div>

                {/* Control Bar - Categorization & Search */}
                <section className="sticky top-20 z-50 mb-12 py-4 px-6 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-2xl shadow-xl flex flex-col lg:flex-row gap-6 items-center justify-between">

                    {/* Visual Category Grid - Scrollable */}
                    <div className="flex w-full lg:max-w-[70%] overflow-x-auto gap-3 no-scrollbar pb-2 lg:pb-0 snap-x">
                        {categories.map((cat) => {
                            const Icon = categoryIconMap[cat] || ChefHat;
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "group flex items-center gap-3 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-500 border shrink-0 snap-start",
                                        isActive
                                            ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                            : "bg-background/40 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground"
                                    )}
                                >
                                    <Icon size={16} className={isActive ? "text-primary-foreground" : "text-primary group-hover:scale-110 transition-transform"} />
                                    <span className="text-[11px] md:text-xs font-black tracking-widest uppercase">{cat}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Compact Search */}
                    <div className={cn(
                        "relative w-full lg:w-72 transition-all duration-500",
                        isSearchFocused ? "lg:w-96" : "lg:w-72"
                    )}>
                        <Search className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                            isSearchFocused ? "text-primary" : "text-muted-foreground"
                        )} size={18} />
                        <input
                            type="text"
                            placeholder="Find your favorite..."
                            value={searchQuery}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-background/50 border border-border/50 rounded-xl pl-12 pr-10 py-3 text-sm font-bold focus:border-primary/50 focus:ring-0 outline-none transition-all placeholder:text-muted-foreground/50"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </section>

                {/* Grid Header & Ambient Effect */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl md:text-3xl font-black font-heading tracking-tighter">
                            {activeCategory === "All" ? "Featured Delights" : activeCategory}
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                            {filteredItems.length} Items
                        </span>
                    </div>
                </div>

                {/* The Menu Grid */}
                <section className="mb-32">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-6">
                            <div className="relative">
                                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                                <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse rounded-full" />
                            </div>
                            <p className="text-muted-foreground font-heading italic text-lg animate-bounce">Crafting the experience...</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center py-32 space-y-6">
                            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto border border-primary/10">
                                <Utensils className="text-primary/20" size={32} />
                            </div>
                            <div className="space-y-2">
                                <p className="text-2xl font-black font-heading text-foreground">No dishes found</p>
                                <p className="text-muted-foreground">Adjust your search or try another category</p>
                            </div>
                            <Button variant="outline" className="rounded-full px-8" onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}>
                                Reset Filters
                            </Button>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                                        className="group relative flex flex-col h-full rounded-[2rem] bg-card border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden"
                                    >
                                        {/* Premium Image Header */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                                            <img
                                                src={sanitizeImageUrl(item.image)}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';
                                                }}
                                            />

                                            {/* Labels Overlay */}
                                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                                                <div className="flex flex-col gap-2">
                                                    <div className={cn(
                                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center backdrop-blur-lg shadow-xl",
                                                        item.isVeg ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"
                                                    )}>
                                                        <div className={cn("w-2 h-2 rounded-full", item.isVeg ? "bg-green-500" : "bg-red-500")} />
                                                    </div>
                                                </div>

                                                {!item.variant_prices && (
                                                    <div className="bg-background/80 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full text-sm font-black text-primary shadow-2xl">
                                                        ₹{item.price}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Content Block */}
                                        <div className="p-6 flex flex-col flex-grow relative">
                                            <div className="mb-4">
                                                <h3 className="text-xl font-black font-heading tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                                    {item.name}
                                                </h3>
                                                <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 md:line-clamp-3 font-medium">
                                                    {item.description}
                                                </p>
                                            </div>

                                            {/* Pricing & Variants */}
                                            <div className="mt-auto space-y-4 pt-4 border-t border-border/40">
                                                {item.variant_prices ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {Object.entries(item.variant_prices as Record<string, number>).map(([variant, price]) => (
                                                            <div key={variant} className="flex flex-col items-center bg-accent/30 px-3 py-1.5 rounded-xl border border-border/50 min-w-[60px]">
                                                                <span className="text-[8px] uppercase font-bold text-muted-foreground/60 tracking-widest mb-0.5">{variant}</span>
                                                                <span className="text-xs font-black">₹{price}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between group/price">
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <Clock size={12} className="text-primary" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">Freshly Prepared</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-primary text-xl font-black">₹{item.price}</span>
                                                            <ChevronRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </section>
            </main>

            <Footer />

            {/* Ambient Background Decor */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[150px] rounded-full" />
            </div>
        </div>
    );
}
