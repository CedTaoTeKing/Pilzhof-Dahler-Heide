import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
    return (
        <div className="font-sans antialiased text-forest bg-cream relative selection:bg-gold selection:text-forest">
            <div className="grain-overlay" />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
