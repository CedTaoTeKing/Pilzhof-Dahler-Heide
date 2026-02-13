import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClasses = `fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled ? 'bg-forest/95 backdrop-blur-md py-4 shadow-md' : 'bg-transparent py-6'
    }`;

    const textClasses = scrolled ? 'text-cream' : 'text-cream';

    return (
        <nav className={navClasses}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className={`text-2xl font-serif font-bold tracking-wider ${textClasses}`}>
                    PILZHOF
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#vision" className={`text-sm tracking-widest uppercase hover:text-gold transition-colors ${textClasses}`}>Vision</a>
                    <a href="#signature" className={`text-sm tracking-widest uppercase hover:text-gold transition-colors ${textClasses}`}>Pilze</a>
                    <a href="#baba" className={`text-sm tracking-widest uppercase hover:text-baba transition-colors ${textClasses}`}>Baba Shrooms</a>
                    <a href="#recipes" className={`text-sm tracking-widest uppercase hover:text-gold transition-colors ${textClasses}`}>Rezepte</a>
                    <Button variant="light" className="!py-2 !px-6">Kontakt</Button>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${textClasses}`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-forest border-t border-white/10 p-6 flex flex-col space-y-4 md:hidden">
                     <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="text-cream text-lg font-serif">Vision</a>
                     <a href="#signature" onClick={() => setMobileMenuOpen(false)} className="text-cream text-lg font-serif">Pilze</a>
                     <a href="#baba" onClick={() => setMobileMenuOpen(false)} className="text-cream text-lg font-serif text-baba">Baba Shrooms</a>
                     <a href="#recipes" onClick={() => setMobileMenuOpen(false)} className="text-cream text-lg font-serif">Rezepte</a>
                     <div className="pt-4">
                        <Button variant="light" fullWidth>Kontakt</Button>
                     </div>
                </div>
            )}
        </nav>
    );
};