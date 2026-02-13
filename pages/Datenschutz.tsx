import React from 'react';
import { Link } from 'react-router-dom';

export const Datenschutz: React.FC = () => {
    return (
        <section className="py-24 min-h-screen">
            <div className="container mx-auto px-6 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-serif text-forest mb-8">Datenschutzerklärung</h1>
                <p className="text-forest/70 mb-8">
                    Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend informieren wir Sie über die Verarbeitung von Daten auf dieser Website.
                </p>
                <div className="prose prose-forest max-w-none space-y-6 text-forest/80">
                    <div>
                        <h2 className="text-xl font-serif text-forest mt-8 mb-2">1. Verantwortliche Stelle</h2>
                        <p>Pilzhof Dahl Heide, [Adresse]. Kontakt: info@pilzhof-dahl-heide.de</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-serif text-forest mt-8 mb-2">2. Erhebung und Speicherung personenbezogener Daten</h2>
                        <p>Beim Besuch dieser Website werden durch den Browser automatisch Zugriffsdaten (IP-Adresse, Datum, Uhrzeit, aufgerufene Seite) in Server-Logfiles erfasst. Diese Daten sind für die Bereitstellung der Seite erforderlich und werden nicht mit anderen Datenquellen zusammengeführt.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-serif text-forest mt-8 mb-2">3. Kontaktformular</h2>
                        <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben inklusive Kontaktdaten zur Bearbeitung Ihrer Anfrage gespeichert und verwendet.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-serif text-forest mt-8 mb-2">4. Ihre Rechte</h2>
                        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie auf Datenübertragbarkeit. Kontaktieren Sie uns unter info@pilzhof-dahl-heide.de.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-serif text-forest mt-8 mb-2">5. Änderungen</h2>
                        <p>Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Die aktuelle Version finden Sie stets auf dieser Seite.</p>
                    </div>
                </div>
                <p className="mt-12">
                    <Link to="/" className="text-gold hover:text-earth font-serif border-b border-gold hover:border-earth transition-colors">← Zurück zur Startseite</Link>
                </p>
            </div>
        </section>
    );
};
