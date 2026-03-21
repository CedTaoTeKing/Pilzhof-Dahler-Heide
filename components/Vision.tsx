import React from 'react';
import { VISION_PILLARS } from '../constants';

export const Vision: React.FC = () => {
    return (
        <section
            id="vision"
            className="py-24 relative overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(197,179,88,0.04) 0%, transparent 60%), #F5F1E8'
            }}
        >
            {/* Mycelium decorative background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#1C2B22" strokeWidth="0.2" />
                    <path d="M0,20 Q40,60 80,20 T100,80" fill="none" stroke="#1C2B22" strokeWidth="0.1" />
                </svg>
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-forest mb-6 leading-[1.15] tracking-tight">
                        Wir kultivieren mehr als Pilze. <br />
                        <span className="italic text-earth">Wir kultivieren Zukunft.</span>
                    </h2>
                    <div className="w-16 h-px bg-gold mx-auto opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {VISION_PILLARS.map((pillar, index) => (
                        <div key={index} className="group p-10 border border-earth/10 hover:border-earth/30 transition-all duration-500 bg-white/60 backdrop-blur-sm rounded shadow-soft-sm hover:shadow-soft-md">
                            <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                                <span className="font-serif font-bold text-lg">{index + 1}</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-serif font-semibold text-forest mb-3">{pillar.title}</h3>
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