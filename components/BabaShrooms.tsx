import React from 'react';
import { Button } from './ui/Button';
import { BABA_FOODS } from '../constants';

export const BabaShrooms: React.FC = () => {
    return (
        <section id="baba" className="py-24 bg-gray-900 text-cream relative">
            {/* Visual accent background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-baba/5 pointer-events-none rounded-l-[10rem] filter blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <div>
                        <h2 className="text-baba font-bold tracking-widest uppercase mb-2">Streetfood Evolution</h2>
                        <h3 className="text-4xl md:text-6xl font-serif text-white">
                            Baba Shrooms
                        </h3>
                        <p className="mt-4 text-gray-400 max-w-lg">
                            Wo Myzel auf Feuer trifft. 100% Vegan. 100% Geschmacksexplosion.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0">
                         <Button variant="baba">Zum Food Truck</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {BABA_FOODS.map((item) => (
                        <div key={item.id} className="group relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-baba transition-colors duration-300">
                            <div className="aspect-square overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter grayscale-[20%] group-hover:grayscale-0"
                                />
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-baba transition-colors">{item.name}</h4>
                                <p className="text-gray-400 text-sm mb-4 h-16">{item.description}</p>
                                <button className="text-baba text-sm uppercase font-bold tracking-wider hover:text-white transition-colors flex items-center gap-2">
                                    Jetzt probieren
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};