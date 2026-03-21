import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { RECIPES } from '../constants';

export const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const recipe = id ? RECIPES.find((r) => r.id === id) : undefined;

    if (!recipe) {
        return (
            <section className="py-24 min-h-screen">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h1 className="text-3xl font-serif text-forest mb-4">Rezept nicht gefunden</h1>
                    <Link to="/#recipes" className="text-gold hover:text-earth font-serif border-b border-gold hover:border-earth transition-colors">
                        Zurück zum Rezeptbuch
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link to="/#recipes" className="inline-block text-gold hover:text-earth font-serif border-b border-gold hover:border-earth transition-colors mb-8">
                    ← Zurück zum Rezeptbuch
                </Link>
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/2">
                        <div className="aspect-[3/4] overflow-hidden rounded shadow-soft-lg">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="mt-4 text-forest/60 text-sm uppercase tracking-widest font-semibold">{recipe.time}</p>
                    </div>
                    <div className="md:w-1/2">
                        <h1 className="text-3xl md:text-5xl font-serif font-semibold text-forest mb-6 leading-[1.15] tracking-tight">{recipe.title}</h1>
                        <p className="text-xl text-forest/80 font-light leading-relaxed mb-8 max-w-[65ch]">
                            {recipe.description}
                        </p>
                        <p className="text-forest/60">
                            Rezeptdetails und Zubereitung folgen in Kürze. Bei Interesse kontaktieren Sie uns gerne.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
