import React from 'react';
import { Link } from 'react-router-dom';

export const Impressum: React.FC = () => {
    return (
        <section className="py-24 min-h-screen">
            <div className="container mx-auto px-6 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-serif text-forest mb-8">Impressum</h1>
                <p className="text-forest/70 mb-6">
                    Angaben gemäß § 5 TMG
                </p>
                <div className="prose prose-forest max-w-none space-y-4 text-forest/80">
                    <p><strong>Pilzhof Dahl Heide</strong><br />[Adresse ergänzen]<br />[PLZ Ort]</p>
                    <p><strong>Kontakt</strong><br />E-Mail: info@pilzhof-dahl-heide.de</p>
                    <p><strong>Umsatzsteuer-ID</strong><br />Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [falls vorhanden]</p>
                    <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</strong><br />[Name, Anschrift]</p>
                </div>
                <div id="agb" className="mt-16 pt-12 border-t border-earth/20">
                    <h2 className="text-2xl font-serif text-forest mb-6">Allgemeine Geschäftsbedingungen (AGB)</h2>
                    <p className="text-forest/70">
                        [Platzhalter: AGB werden hier ergänzt.]
                    </p>
                </div>
                <p className="mt-12">
                    <Link to="/" className="text-gold hover:text-earth font-serif border-b border-gold hover:border-earth transition-colors">← Zurück zur Startseite</Link>
                </p>
            </div>
        </section>
    );
};
