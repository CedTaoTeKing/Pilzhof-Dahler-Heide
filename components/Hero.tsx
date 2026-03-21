import React, { useEffect, useState } from 'react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-forest">
            {/* Background Image with Parallax-like feel */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://picsum.photos/id/1039/1920/1080"
                    alt="Forest Floor"
                    className={`w-full h-full object-cover transition-opacity duration-[2000ms] ${loaded ? 'opacity-60' : 'opacity-0'}`}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, rgba(14,23,16,0.35) 0%, rgba(14,23,16,0.15) 40%, rgba(28,43,34,0.60) 75%, rgba(28,43,34,0.92) 100%)'
                    }}
                />
            </div>

            {/* Content */}
            <div className={`relative z-10 container mx-auto px-6 md:px-12 max-w-7xl text-center transform transition-all duration-[1500ms] ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-gold/80 text-xs md:text-sm tracking-[0.2em] uppercase mb-4 font-semibold">
                    100% Vegan · Regional · Regenerativ
                </h2>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold text-cream mb-6 tracking-tight leading-[1.05] max-w-3xl mx-auto">
                    Pilzhof Dahl Heide
                </h1>

                <p className="text-xl md:text-2xl text-cream/90 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                    Mehr als Bio. Eine Vision aus Myzel, Nachhaltigkeit und Geschmack.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <a href="#signature">
                        <Button variant="outline-light" className="min-w-[200px]">
                            Entdecke unsere Pilze
                        </Button>
                    </a>
                    <a href="#recipes" className="text-cream hover:text-gold transition-colors text-sm uppercase tracking-widest border-b border-transparent hover:border-gold pb-1">
                        Zur Rezeptwelt
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse">
                <svg className="w-6 h-6 text-cream/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};