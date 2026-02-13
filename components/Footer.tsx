import React from 'react';
import { Button } from './ui/Button';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-forest text-cream pt-24 pb-12 border-t border-cream/5">
            <div className="container mx-auto px-6">
                
                {/* Main CTA Section */}
                <div className="bg-earth/20 rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto mb-20 backdrop-blur-sm border border-white/5">
                    <h2 className="text-3xl md:text-4xl font-serif mb-6">Werde Teil unseres Netzwerks</h2>
                    <p className="text-cream/70 mb-10 max-w-xl mx-auto">
                        Ob Gastronomie, Einzelhandel oder privater Genießer. Wir wachsen gemeinsam.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button variant="primary" className="!bg-cream !text-forest hover:!bg-gold">Direkt kaufen</Button>
                        <Button variant="secondary" className="!border-cream !text-cream hover:!bg-cream hover:!text-forest">Kooperation anfragen</Button>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-12">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-serif font-bold tracking-wider block mb-6">PILZHOF</span>
                        <p className="text-sm text-cream/50">
                            Dahl Heide<br/>
                            Regional. Regenerativ.<br/>
                            Germany
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4 text-gold text-sm uppercase tracking-widest">Entdecken</h4>
                        <ul className="space-y-2 text-sm text-cream/70">
                            <li><a href="#" className="hover:text-white transition-colors">Unsere Pilze</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Vision</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Prozess</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gold text-sm uppercase tracking-widest">Genuss</h4>
                        <ul className="space-y-2 text-sm text-cream/70">
                            <li><a href="#" className="hover:text-white transition-colors">Baba Shrooms</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Rezeptbuch</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gold text-sm uppercase tracking-widest">Rechtliches</h4>
                        <ul className="space-y-2 text-sm text-cream/70">
                            <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center text-xs text-cream/30">
                    &copy; {new Date().getFullYear()} Pilzhof Dahl Heide. All rights reserved.
                </div>
            </div>
        </footer>
    );
};