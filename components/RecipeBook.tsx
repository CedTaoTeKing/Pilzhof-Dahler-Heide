import React from 'react';
import { Link } from 'react-router-dom';
import { RECIPES } from '../constants';

export const RecipeBook: React.FC = () => {
    return (
        <section id="recipes" className="py-24 bg-cream">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">Das Pilzhof Rezeptbuch</h2>
                    <p className="text-forest/60 max-w-2xl mx-auto">
                        Inspiration für die Küche. Entdecke die Vielfalt unserer Pilze in kuratierten Gerichten.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {RECIPES.map((recipe) => (
                        <Link key={recipe.id} to={`/rezepte/${recipe.id}`} className="group block">
                            <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded-sm shadow-md">
                                <img 
                                    src={recipe.image} 
                                    alt={recipe.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur px-3 py-1 text-xs font-bold text-forest uppercase tracking-widest rounded-full">
                                    {recipe.time}
                                </div>
                                <div className="absolute inset-0 bg-forest/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-cream border border-cream px-6 py-2 uppercase tracking-widest group-hover:bg-cream group-hover:text-forest transition-colors">
                                        Rezept ansehen
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-serif text-forest mb-2 group-hover:text-earth transition-colors">
                                {recipe.title}
                            </h3>
                            <p className="text-forest/70 font-sans text-sm">
                                {recipe.description}
                            </p>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a href="#recipes" className="inline-block border-b-2 border-forest text-forest pb-1 hover:text-gold hover:border-gold transition-colors font-serif italic text-xl">
                        Alle Rezepte ansehen
                    </a>
                </div>
            </div>
        </section>
    );
};