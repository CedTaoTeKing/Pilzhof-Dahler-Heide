import React from 'react';
import { Button } from './ui/Button';

export const SignatureProduct: React.FC = () => {
    return (
        <section id="signature" className="py-24 bg-forest text-cream">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                             <img 
                                src="https://picsum.photos/id/1062/800/1000" 
                                alt="Castanhen Seitling Macro" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-forest/90 to-transparent p-8">
                                <span className="text-gold tracking-widest text-xs uppercase">Signature Product</span>
                                <h3 className="text-3xl font-serif">Castanhen Seitling</h3>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                                Die Königin der <br/>Edelpilze
                            </h2>
                            <p className="text-lg text-cream/80 font-light leading-relaxed border-l-2 border-gold/30 pl-6">
                                Botanisch einzigartig. Kulinarisch unersetzlich. Unser Castanhen Seitling wächst auf regionalem Substrat zur Perfektion heran.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-gold uppercase tracking-widest text-sm mb-2 font-bold">Geschmack</h4>
                                <p className="text-cream/70 text-sm">
                                    Nussiges Aroma, fleischige Textur, intensives Umami. Ein vollwertiger Protagonist auf jedem Teller.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-gold uppercase tracking-widest text-sm mb-2 font-bold">Vitalität</h4>
                                <p className="text-cream/70 text-sm">
                                    Reich an Proteinen, Vitamin B und essentiellen Aminosäuren. 
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button variant="outline-light">Jetzt entdecken</Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};