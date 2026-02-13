import React from 'react';
import { VISION_PILLARS } from '../constants';

export const Vision: React.FC = () => {
    return (
        <section id="vision" className="py-24 bg-cream relative overflow-hidden">
            {/* Mycelium decorative background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#1C2B22" strokeWidth="0.2"/>
                    <path d="M0,20 Q40,60 80,20 T100,80" fill="none" stroke="#1C2B22" strokeWidth="0.1"/>
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">
                        Wir kultivieren mehr als Pilze. <br/>
                        <span className="italic text-earth">Wir kultivieren Zukunft.</span>
                    </h2>
                    <div className="w-24 h-1 bg-gold mx-auto opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {VISION_PILLARS.map((pillar, index) => (
                        <div key={index} className="group p-8 border border-earth/10 hover:border-earth/30 transition-all duration-500 bg-white/40 backdrop-blur-sm rounded-sm hover:-translate-y-2">
                            <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                                <span className="font-serif font-bold text-lg">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-serif text-forest mb-3">{pillar.title}</h3>
                            <p className="text-forest/70 font-sans leading-relaxed">
                                {pillar.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};