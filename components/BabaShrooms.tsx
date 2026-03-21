import React from 'react';
import { Button } from './ui/Button';
import { BABA_FOODS } from '../constants';

export const BabaShrooms: React.FC = () => {
    return (
        <section
            id="baba"
            className="py-24 text-cream relative"
            style={{
                background: 'radial-gradient(ellipse 50% 60% at 80% 30%, rgba(212,64,7,0.06) 0%, transparent 70%), linear-gradient(180deg, #111A14 0%, #0E1710 100%)'
            }}
        >
            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <div>
                        <h2 className="text-baba font-semibold tracking-widest uppercase mb-2 text-xs md:text-sm">Streetfood Evolution</h2>
                        <h3 className="text-3xl md:text-5xl font-serif font-semibold text-white leading-[1.15] tracking-tight">
                            Baba Shrooms
                        </h3>
                        <p className="mt-4 text-neutral-400 max-w-lg">
                            Wo Myzel auf Feuer trifft. 100% Vegan. 100% Geschmacksexplosion.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <Button variant="baba">Zum Food Truck</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {BABA_FOODS.map((item) => (
                        <div key={item.id} className="group relative bg-neutral-800 rounded overflow-hidden border border-neutral-700 hover:border-baba transition-colors duration-300 cursor-pointer">
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5">
                                <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-baba transition-colors">{item.name}</h4>
                                <p className="text-neutral-400 text-sm line-clamp-3">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};