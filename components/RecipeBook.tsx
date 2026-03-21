import React from 'react';
import { Link } from 'react-router-dom';
import { RECIPES } from '../constants';
import { Button } from './ui/Button';

export const RecipeBook: React.FC = () => {
    return (
        <section id="recipes" className="py-24 bg-cream">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-forest mb-6 leading-[1.15] tracking-tight">Das Pilzhof Rezeptbuch</h2>
                    <p className="text-forest/60 max-w-2xl mx-auto">
                        Inspiration für die Küche. Entdecke die Vielfalt unserer Pilze in kuratierten Gerichten.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {RECIPES.map((recipe) => (
                        <Link key={recipe.id} to={`/rezepte/${recipe.id}`} className="group block">
                            <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded shadow-soft-md">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur px-3 py-1 text-xs font-semibold text-forest uppercase tracking-widest rounded-full">
                                    {recipe.time}
                                </div>
                                <div className="absolute inset-0 bg-forest/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-cream text-sm uppercase tracking-widest">
                                        Rezept ansehen
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif font-semibold text-forest mb-2 group-hover:text-earth transition-colors">
                                {recipe.title}
                            </h3>
                            <p className="text-forest/70 font-sans text-sm">
                                {recipe.description}
                            </p>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button variant="secondary">Alle Rezepte ansehen</Button>
                </div>
            </div>
        </section>
    );
};