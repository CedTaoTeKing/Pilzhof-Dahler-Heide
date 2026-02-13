import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Vision } from './components/Vision';
import { SignatureProduct } from './components/SignatureProduct';
import { ProcessTimeline } from './components/ProcessTimeline';
import { BabaShrooms } from './components/BabaShrooms';
import { RecipeBook } from './components/RecipeBook';
import { Footer } from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="font-sans antialiased text-forest bg-cream relative selection:bg-gold selection:text-forest">
            {/* Global Grain Overlay defined in CSS in index.html, but adding a React wrapper if needed logic in future */}
            <div className="grain-overlay" />

            <Navbar />
            
            <main>
                <Hero />
                <Vision />
                <SignatureProduct />
                <ProcessTimeline />
                <BabaShrooms />
                <RecipeBook />
            </main>

            <Footer />
        </div>
    );
};

export default App;