"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, CalendarDays, Star, Leaf, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isVeg: boolean;
    isBestseller?: boolean;
}

interface Event {
    id: string;
    title: string;
    description: string;
    event_date: string;
    poster_url: string | null;
    is_active: boolean;
}

const tabVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.07 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

function formatEventDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {icon}
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">{text}</p>
        </div>
    );
}

export function TodaysMenuAndEvents() {
    const [activeTab, setActiveTab] = useState<"menu" | "events">("menu");
    const [specials, setSpecials] = useState<MenuItem[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loadingMenu, setLoadingMenu] = useState(true);
    const [loadingEvents, setLoadingEvents] = useState(true);

    useEffect(() => {
        fetch("/api/daily-specials")
            .then(r => r.json())
            .then(data => setSpecials(Array.isArray(data) ? data : []))
            .catch(() => setSpecials([]))
            .finally(() => setLoadingMenu(false));

        fetch("/api/events")
            .then(r => r.json())
            .then(data => setEvents(Array.isArray(data) ? data : []))
            .catch(() => setEvents([]))
            .finally(() => setLoadingEvents(false));
    }, []);

    return (
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-14"
                >
                    <span className="text-primary font-heading italic text-base mb-2 block tracking-wide">
                        What&apos;s On Today
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 tracking-tight">
                        Today&apos;s Menu &amp; Events
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Fresh picks and upcoming celebrations — updated daily by our team.
                    </p>
                </motion.div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex items-center gap-1 bg-card/60 border border-border/50 rounded-2xl p-1.5 backdrop-blur-sm shadow-lg">
                        {([
                            { key: "menu", label: "Today's Special", icon: <Utensils size={15} /> },
                            { key: "events", label: "Events", icon: <CalendarDays size={15} /> },
                        ] as const).map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`
                                    flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
                                    transition-all duration-300
                                    ${activeTab === tab.key
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                                        : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                                    }
                                `}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">

                    {/* ── TODAY'S SPECIAL ───────────────────────────── */}
                    {activeTab === "menu" && (
                        <motion.div key="menu" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                            {loadingMenu ? (
                                <div className="flex justify-center items-center py-24">
                                    <Loader2 className="animate-spin text-primary" size={36} />
                                </div>
                            ) : specials.length === 0 ? (
                                <EmptyState
                                    icon={<Utensils size={28} />}
                                    text="No specials set for today. Check back later or browse our full menu!"
                                />
                            ) : (
                                <motion.div
                                    variants={tabVariants}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                                >
                                    {specials.map(item => (
                                        <motion.div
                                            key={item.id}
                                            variants={cardVariants}
                                            whileHover={{ y: -6 }}
                                            className="group bg-card/60 rounded-2xl overflow-hidden border border-border/50
                                                       hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10
                                                       transition-all duration-300 backdrop-blur-sm"
                                        >
                                            {/* Image */}
                                            <div className="relative w-full h-44 overflow-hidden">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-card flex items-center justify-center">
                                                        <Utensils size={32} className="text-muted-foreground" />
                                                    </div>
                                                )}
                                                {/* Veg / Non-veg badge */}
                                                <div className="absolute top-3 left-3">
                                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center
                                                        ${item.isVeg ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"}`}>
                                                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`} />
                                                    </div>
                                                </div>
                                                {/* Today's special badge */}
                                                <div className="absolute top-3 right-3">
                                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full shadow">
                                                        <Star size={9} fill="currentColor" /> Today&apos;s Pick
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <h3 className="font-bold text-foreground text-sm leading-tight">{item.name}</h3>
                                                    <span className="text-primary font-extrabold text-sm whitespace-nowrap">
                                                        ₹{item.price}
                                                    </span>
                                                </div>
                                                {item.description && (
                                                    <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">{item.description}</p>
                                                )}
                                                <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}

                            {/* View full menu CTA */}
                            <div className="text-center mt-10">
                                <Link href="/menu">
                                    <Button variant="outline" className="gap-2 px-8">
                                        View Full Menu <ChevronRight size={16} />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {/* ── EVENTS ────────────────────────────────────── */}
                    {activeTab === "events" && (
                        <motion.div key="events" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
                            {loadingEvents ? (
                                <div className="flex justify-center items-center py-24">
                                    <Loader2 className="animate-spin text-primary" size={36} />
                                </div>
                            ) : events.length === 0 ? (
                                <EmptyState
                                    icon={<CalendarDays size={28} />}
                                    text="No upcoming events right now. Follow us for announcements!"
                                />
                            ) : (
                                <motion.div
                                    variants={tabVariants}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {events.map(event => (
                                        <motion.div
                                            key={event.id}
                                            variants={cardVariants}
                                            whileHover={{ y: -6 }}
                                            className="group bg-card/60 rounded-2xl overflow-hidden border border-border/50
                                                       hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10
                                                       transition-all duration-300 backdrop-blur-sm"
                                        >
                                            {/* Poster */}
                                            <div className="relative w-full h-52 overflow-hidden bg-card">
                                                {event.poster_url ? (
                                                    <Image
                                                        src={event.poster_url}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-card">
                                                        <CalendarDays size={36} className="text-primary/50" />
                                                        <span className="text-xs text-muted-foreground">No poster</span>
                                                    </div>
                                                )}
                                                {/* Date chip overlay */}
                                                <div className="absolute bottom-3 left-3">
                                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-black/70 backdrop-blur-sm
                                                                     text-white text-[11px] font-bold rounded-full">
                                                        <CalendarDays size={11} />
                                                        {formatEventDate(event.event_date)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="p-5">
                                                <h3 className="font-bold text-foreground text-base mb-2 leading-snug">{event.title}</h3>
                                                {event.description && (
                                                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">{event.description}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </section>
    );
}
