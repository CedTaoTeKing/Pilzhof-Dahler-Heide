import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { Impressum } from './pages/Impressum';
import { Datenschutz } from './pages/Datenschutz';
import { RecipeDetail } from './pages/RecipeDetail';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="impressum" element={<Impressum />} />
                    <Route path="datenschutz" element={<Datenschutz />} />
                    <Route path="rezepte/:id" element={<RecipeDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
