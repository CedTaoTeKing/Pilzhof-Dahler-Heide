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
                <div className="absolute inset-0 bg-gradient-to-b from-forest/30 via-forest/20 to-forest/90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className={`relative z-10 container mx-auto px-6 text-center transform transition-all duration-[1500ms] ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-gold/80 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium">
                    100% Vegan | Regional | Regenerativ
                </h2>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-cream mb-6 tracking-tight">
                    Pilzhof Dahl Heide
                </h1>
                
                <p className="text-xl md:text-2xl text-cream/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                    Mehr als Bio. Eine Vision aus Myzel, Nachhaltigkeit und Geschmack.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <Button variant="outline-light" className="min-w-[200px]">
                        Entdecke unsere Pilze
                    </Button>
                    <a href="#recipes" className="text-cream hover:text-gold transition-colors text-sm uppercase tracking-widest border-b border-transparent hover:border-gold pb-1">
                        Zur Rezeptwelt
                    </a>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-cream/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};