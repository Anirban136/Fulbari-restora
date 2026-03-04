'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import restaurantData from '@/data/restaurant_new_menu.json';
import CategorySection from './CategorySection';

const MenuSection = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = useMemo(() => {
        return ['All', ...restaurantData.menu.map(c => c.category)];
    }, []);

    const filteredMenu = useMemo(() => {
        return restaurantData.menu
            .map(category => {
                // Filter items by search query inside this category
                const filteredItems = category.items.filter(item =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                return { ...category, items: filteredItems };
            })
            // Filter categories based on selection and if they have items left
            .filter(category => {
                const matchesTab = activeCategory === 'All' || category.category === activeCategory;
                const hasItems = category.items.length > 0;
                return matchesTab && hasItems;
            });
    }, [activeCategory, searchQuery]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-card/30 p-4 rounded-2xl border border-border/50 shadow-sm backdrop-blur-sm sticky top-24 z-30">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar snap-x">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`snap-start px-5 py-2.5 rounded-full whitespace-nowrap transition-all text-sm font-bold shadow-sm ${activeCategory === cat
                                    ? 'bg-primary text-primary-foreground scale-105'
                                    : 'bg-accent text-muted-foreground hover:bg-card hover:text-foreground border border-border/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-72 shrink-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Search our fine dining menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 rounded-full bg-accent border-transparent focus:bg-card focus:border-primary/50 outline-none transition-all shadow-sm font-medium"
                    />
                </div>
            </div>

            <div className="space-y-4 min-h-[50vh]">
                {filteredMenu.length > 0 ? (
                    filteredMenu.map((category) => (
                        <CategorySection key={category.category} category={category} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-card/20 rounded-3xl border border-dashed border-border p-8">
                        <Search size={48} className="text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground text-xl font-medium mb-4">No culinary delights found matching your search.</p>
                        <button
                            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                            className="text-primary hover:text-primary/80 font-bold underline transition-colors"
                        >
                            Explore Full Menu
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuSection;
