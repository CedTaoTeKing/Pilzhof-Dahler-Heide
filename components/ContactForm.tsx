import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isKooperation, setIsKooperation] = useState(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, isKooperation }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                setStatus('error');
                setErrorMessage(data.error || 'Etwas ist schiefgelaufen. Bitte später erneut versuchen.');
                return;
            }
            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
            setIsKooperation(false);
        } catch {
            setStatus('error');
            setErrorMessage('Netzwerkfehler. Bitte später erneut versuchen.');
        }
    };

    return (
        <div id="contact-form" className="max-w-xl mx-auto mt-12 pt-12 border-t border-white/10 scroll-mt-24">
            <h3 className="text-xl font-serif text-cream mb-4">Kontakt / Kooperation anfragen</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                    <label htmlFor="contact-name" className="block text-sm text-cream/70 mb-1">Name *</label>
                    <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                        placeholder="Ihr Name"
                    />
                </div>
                <div>
                    <label htmlFor="contact-email" className="block text-sm text-cream/70 mb-1">E-Mail *</label>
                    <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                        placeholder="ihre@email.de"
                    />
                </div>
                <div>
                    <label htmlFor="contact-message" className="block text-sm text-cream/70 mb-1">Nachricht *</label>
                    <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-cream placeholder-cream/40 focus:outline-none focus:border-gold resize-none"
                        placeholder="Ihre Nachricht oder Kooperationsanfrage..."
                    />
                </div>
                <label className="flex items-center gap-2 text-cream/80 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isKooperation}
                        onChange={(e) => setIsKooperation(e.target.checked)}
                        className="rounded border-white/30 bg-white/10 text-gold focus:ring-gold"
                    />
                    <span className="text-sm">Kooperationsanfrage (Gastronomie / Einzelhandel)</span>
                </label>
                {status === 'success' && (
                    <p className="text-green-400 text-sm">Vielen Dank! Ihre Nachricht wurde gesendet.</p>
                )}
                {status === 'error' && (
                    <p className="text-red-300 text-sm">{errorMessage}</p>
                )}
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium bg-cream text-forest hover:bg-gold rounded transition-colors disabled:opacity-50"
                >
                    {status === 'sending' ? 'Wird gesendet…' : 'Nachricht senden'}
                </button>
            </form>
        </div>
    );
};
