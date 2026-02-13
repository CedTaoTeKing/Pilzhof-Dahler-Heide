import React from 'react';
import { PROCESS_STEPS } from '../constants';
import type { ProcessStepIcon } from '../types';

const ProcessStepIconSvg: React.FC<{ icon: ProcessStepIcon; className?: string }> = ({ icon, className = 'w-6 h-6' }) => {
    const baseClass = `${className} text-forest/70`;
    const stroke = 'currentColor';
    switch (icon) {
        case 'grain':
            return (
                <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M5 8c2.5 1.5 6.5 1.5 9 0M5 14c2.5 1.5 6.5 1.5 9 0M5 20c2.5 1.5 6.5 1.5 9 0" />
                    <ellipse cx="12" cy="8" rx="3" ry="2" />
                    <ellipse cx="12" cy="14" rx="3" ry="2" />
                </svg>
            );
        case 'package':
            return (
                <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 8v13H3V8M12 3v18M3 8l9-4 9 4M12 12l9-4" />
                </svg>
            );
        case 'hygiene':
            return (
                <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M4.93 6.93l2.83 2.83M2 12h4M6.93 19.07l2.83-2.83M12 18v4M17.07 19.07l2.83-2.83M18 12h4M17.07 4.93l-2.83 2.83" />
                    <circle cx="12" cy="12" r="4" />
                </svg>
            );
        case 'inoculate':
            return (
                <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v6l4 2-4 2v6M8 10l-2 1 2 1 2-1 2 1" />
                    <circle cx="12" cy="12" r="2" />
                </svg>
            );
        case 'growth':
            return (
                <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20V10M9 20l3-10 3 10M6 20l2-6 2 6M17 20l2-4 2 4M4 20l1-2 1 2" />
                    <path d="M4 14s1.5-2 4-2 5 2 8 2" />
                </svg>
            );
        case 'fruit':
            return (
                <svg className={baseClass} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2c2 2 2 6 2 8 0 3.5-1.5 6-4 8 2.5-2 4-4.5 4-8 0-2 0-6-2-8z" />
                    <ellipse cx="12" cy="16" rx="5" ry="4" />
                </svg>
            );
        default:
            return null;
    }
};

export const ProcessTimeline: React.FC = () => {
    return (
        <section id="process" className="py-24 md:py-32 bg-cream scroll-mt-24">
            <div className="container mx-auto px-6">
                {/* Section label, title, subtitle */}
                <p className="text-center text-earth text-sm font-medium tracking-[0.2em] uppercase mb-4">
                    Unser Prozess
                </p>
                <h2 className="text-4xl md:text-5xl font-serif text-forest text-center mb-6">
                    Von der Spore zum Fruchtkörper
                </h2>
                <p className="text-forest/60 max-w-xl mx-auto text-center text-lg font-light leading-relaxed mb-16">
                    Jeder Schritt ist durchdacht. Jeder Prozess kontrolliert. So entstehen Pilze in höchster Qualität.
                </p>

                <div className="max-w-3xl mx-auto relative">
                    <div className="absolute left-[3rem] top-14 bottom-14 w-px bg-gradient-to-b from-forest/15 via-gold/25 to-forest/15 hidden md:block" aria-hidden />
                    <div className="space-y-4">
                        {PROCESS_STEPS.map((step, index) => (
                            <div
                                key={index}
                                className="group relative rounded-xl bg-white border border-earth/10 p-6 md:p-7 shadow-sm hover:shadow-md hover:border-earth/20 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest text-cream flex items-center justify-center font-serif font-bold text-lg shadow-inner">
                                        {step.number}
                                    </div>
                                    <div className="flex-shrink-0 mt-1">
                                        <ProcessStepIconSvg icon={step.icon || 'grain'} />
                                    </div>
                                    <div className="min-w-0">
                                        {step.category && (
                                            <p className="text-xs font-semibold tracking-widest uppercase mb-1 text-earth/80">
                                                {step.category}
                                            </p>
                                        )}
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-forest mb-2">
                                            {step.subHeading ?? step.title}
                                        </h3>
                                        <p className="text-sm md:text-base font-light leading-relaxed text-forest/75">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
