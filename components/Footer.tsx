import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { ContactForm } from './ContactForm';

export const Footer: React.FC = () => {
    return (
        <footer
            className="text-cream pt-24 pb-12 border-t border-cream/5"
            style={{
                background: 'linear-gradient(180deg, #1C2B22 0%, #0A110D 100%)'
            }}
        >
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">

                {/* Main CTA Section */}
                <div id="contact" className="border border-cream/10 bg-white/[0.03] rounded p-10 md:p-16 text-center max-w-4xl mx-auto mb-20 backdrop-blur-sm scroll-mt-24">
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 leading-[1.15]">Werde Teil unseres Netzwerks</h2>
                    <p className="text-cream/70 mb-10 max-w-xl mx-auto">
                        Ob Gastronomie, Einzelhandel oder privater Genießer. Wir wachsen gemeinsam.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="mailto:info@pilzhof-dahl-heide.de?subject=Direktkauf">
                            <Button variant="light-inverse">Direkt kaufen</Button>
                        </a>
                        <a href="#contact-form">
                            <Button variant="outline-light">Kooperation anfragen</Button>
                        </a>
                    </div>
                    <ContactForm />
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-serif font-bold tracking-wider block mb-6">PILZHOF</span>
                        <p className="text-sm text-cream/50">
                            Dahl Heide<br />
                            Regional. Regenerativ.<br />
                            Germany
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gold text-sm uppercase tracking-widest">Entdecken</h4>
                        <ul className="space-y-2 text-sm text-cream/70">
                            <li><a href="#signature" className="hover:text-white transition-colors">Unsere Pilze</a></li>
                            <li><a href="#vision" className="hover:text-white transition-colors">Vision</a></li>
                            <li><a href="#process" className="hover:text-white transition-colors">Prozess</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gold text-sm uppercase tracking-widest">Genuss</h4>
                        <ul className="space-y-2 text-sm text-cream/70">
                            <li><a href="#baba" className="hover:text-white transition-colors">Baba Shrooms</a></li>
                            <li><a href="#recipes" className="hover:text-white transition-colors">Rezeptbuch</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">Events</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gold text-sm uppercase tracking-widest">Rechtliches</h4>
                        <ul className="space-y-2 text-sm text-cream/70">
                            <li><Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
                            <li><Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
                            <li><Link to="/impressum#agb" className="hover:text-white transition-colors">AGB</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-xs text-cream/40">
                    &copy; {new Date().getFullYear()} Pilzhof Dahl Heide. All rights reserved.
                </div>
            </div>
        </footer>
    );
};