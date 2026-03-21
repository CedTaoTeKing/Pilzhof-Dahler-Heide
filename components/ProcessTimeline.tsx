import React from 'react';
import { PROCESS_STEPS } from '../constants';
import type { ProcessStepIcon } from '../types';

const ProcessStepIconSvg: React.FC<{ icon: ProcessStepIcon; className?: string }> = ({ icon, className = 'w-7 h-7' }) => {
    const baseClass = `${className} text-forest/80`;
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
        <section
            id="process"
            className="py-24 md:py-32 scroll-mt-24"
            style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(197,179,88,0.04) 0%, transparent 60%), #F5F1E8'
            }}
        >
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                {/* Section label, title, subtitle */}
                <p className="text-center text-earth text-xs md:text-sm font-semibold tracking-[0.15em] uppercase mb-4">
                    Unser Prozess
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-semibold text-forest text-center mb-6 leading-[1.15] tracking-tight">
                    Von der Spore zum Fruchtkörper
                </h2>
                <p className="text-forest/60 max-w-xl mx-auto text-center text-lg font-light leading-relaxed mb-16">
                    Jeder Schritt ist durchdacht. Jeder Prozess kontrolliert. So entstehen Pilze in höchster Qualität.
                </p>

                <div className="max-w-4xl mx-auto relative">
                    {/* Mycelium connector line - desktop only */}
                    <svg
                        className="absolute left-7 top-0 bottom-0 hidden md:block"
                        width="2"
                        height="100%"
                        style={{ zIndex: 0 }}
                        aria-hidden
                    >
                        <defs>
                            <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(28,43,34,0.15)" />
                                <stop offset="50%" stopColor="rgba(197,179,88,0.3)" />
                                <stop offset="100%" stopColor="rgba(28,43,34,0.15)" />
                            </linearGradient>
                        </defs>
                        <line x1="1" y1="28" x2="1" y2="100%" stroke="url(#connectorGradient)" strokeWidth="1.5" />
                        {PROCESS_STEPS.map((_, index) => (
                            <circle
                                key={index}
                                cx="1"
                                cy={28 + index * 180}
                                r="3"
                                fill="rgba(197,179,88,0.4)"
                            />
                        ))}
                    </svg>

                    <div className="space-y-0 relative" style={{ zIndex: 1 }}>
                        {PROCESS_STEPS.map((step, index) => {
                            const isFirst = index === 0;
                            const isLast = index === PROCESS_STEPS.length - 1;

                            return (
                                <div
                                    key={index}
                                    className={`group relative bg-white border border-earth/10 rounded p-8 md:p-10 shadow-soft-sm hover:shadow-soft-md hover:border-earth/30 transition-all duration-300 mb-6 ${isFirst ? 'opacity-95' : ''} ${isLast ? 'ring-2 ring-gold/20' : ''}`}
                                >
                                    <div className="flex items-start gap-6">
                                        {/* Step number circle */}
                                        <div className={`flex-shrink-0 w-14 h-14 rounded-full bg-forest text-cream flex items-center justify-center font-serif font-bold text-xl shadow-soft-md ${isLast ? 'ring-2 ring-gold/40' : ''}`}>
                                            {step.number}
                                        </div>

                                        {/* Icon */}
                                        <div className="flex-shrink-0 mt-3 hidden md:block">
                                            <ProcessStepIconSvg icon={step.icon || 'grain'} />
                                        </div>

                                        {/* Content */}
                                        <div className="min-w-0 flex-1">
                                            {step.category && (
                                                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-2 text-earth/60">
                                                    {step.category}
                                                </p>
                                            )}
                                            <h3 className="text-xl md:text-2xl font-serif font-semibold text-forest mb-3 leading-tight">
                                                {step.subHeading ?? step.title}
                                            </h3>
                                            <p className="text-sm md:text-base font-light leading-relaxed text-forest/75 max-w-[65ch]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
