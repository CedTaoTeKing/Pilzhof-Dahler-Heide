import React from 'react';
import { Hero } from '../components/Hero';
import { Vision } from '../components/Vision';
import { SignatureProduct } from '../components/SignatureProduct';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { BabaShrooms } from '../components/BabaShrooms';
import { RecipeBook } from '../components/RecipeBook';

export const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <Vision />
            <SignatureProduct />
            <ProcessTimeline />
            <BabaShrooms />
            <RecipeBook />
        </>
    );
};
