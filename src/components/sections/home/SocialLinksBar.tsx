"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SocialLinksBar() {
    const socials = [
        {
            name: "Facebook",
            icon: Facebook,
            href: "https://www.facebook.com/share/1CJLS6rvRd/",
            color: "hover:text-[#1877F2]",
            label: "Join our Community",
            count: "5k+"
        },
        {
            name: "Instagram",
            icon: Instagram,
            href: "https://www.instagram.com/fulbarirestora?",
            color: "hover:text-[#E4405F]",
            label: "Follow the Vibe",
            count: "2k+"
        },
        {
            name: "Google Maps",
            icon: Star,
            href: "https://search.google.com/local/writereview?placeid=ChIJc16FaACF-DkRxbOmYTvrkAY",
            color: "hover:text-[#F4B400]",
            label: "Review our Flavors",
            count: "4.5★"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative z-20 -mt-10 md:-mt-16 px-4 mb-8 md:mb-12">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-[2rem] md:rounded-full bg-card/40 backdrop-blur-2xl border border-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                >
                    {/* Brand Tagline */}
                    <motion.div variants={item} className="flex items-center gap-4 px-4 hidden lg:flex">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="font-heading font-black text-xs">FB</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">Connect with us</span>
                            <span className="text-xs font-bold text-foreground italic">@fulbarirestora</span>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-8 flex-1">
                        {socials.map((social) => (
                            <motion.div key={social.name} variants={item}>
                                <Link
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex items-center gap-3 px-4 py-2 rounded-full hover:bg-primary/5 transition-all duration-300 ${social.color}`}
                                >
                                    <div className="relative">
                                        <social.icon size={18} className="transition-transform group-hover:scale-110" />
                                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-0.5">{social.name}</span>
                                        <span className="text-[9px] font-medium text-muted-foreground whitespace-nowrap">{social.label}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.div variants={item} className="px-2">
                        <Link href="/contact" className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300">
                            Visit Us <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
