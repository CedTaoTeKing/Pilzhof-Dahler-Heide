import React from 'react';
import { PROCESS_STEPS } from '../constants';

export const ProcessTimeline: React.FC = () => {
    return (
        <section className="py-32 md:py-48 bg-mushroom/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-32 md:mb-40">
                    <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">Transparenz im Prozess</h2>
                    <p className="text-forest/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
                        Vom Dinkelspelz zum Gourmet-Pilz. Ein Kreislauf der Natur, technisch perfektioniert.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto relative">
                    {/* Center Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-earth/10 transform md:-translate-x-1/2"></div>

                    {PROCESS_STEPS.map((step, index) => (
                        <div key={index} className={`relative flex items-start mb-32 md:mb-56 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            
                            {/* Mobile visual connector fix */}
                            <div className="absolute left-4 w-3 h-3 bg-earth rounded-full mt-2 md:hidden transform -translate-x-1/2 border-4 border-cream z-10"></div>

                            {/* Content Half */}
                            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-32">
                                <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                                    <span className="text-gold font-bold text-6xl opacity-10 font-serif mb-4">{step.number}</span>
                                    <h3 className="text-3xl font-serif text-forest mb-4">{step.title}</h3>
                                    <p className="text-forest/70 font-sans text-lg font-light leading-loose tracking-wide">{step.description}</p>
                                </div>
                            </div>

                            {/* Center Dot for Desktop */}
                            <div className="hidden md:block absolute left-1/2 top-4 w-4 h-4 bg-earth rounded-full transform -translate-x-1/2 border-4 border-cream z-10 transition-transform duration-500 hover:scale-150 shadow-sm"></div>
                            
                            {/* Empty Half for balance */}
                            <div className="hidden md:block w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};