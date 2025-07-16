// File: src/components/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Message {
    id: number;
    sender: 'user' | 'bot';
    text: string;
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
    const [disabled, setDisabled] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // 1. Accueil
    useEffect(() => {
        const welcome: Message = {
            id: Date.now(),
            sender: 'bot',
            text: `👋 Bonjour ! Je suis votre coach Sport & Nutrition.\n\nJe peux vous conseiller sur vos entraînements, vos repas, ou répondre à toute question fitness.`
        };
        setMessages([welcome]);
    }, []);

    // Scroll auto
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || disabled) return;

        const text = input.trim();
        const userMsg: Message = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setHistory(prev => [...prev, { role: 'user', content: text }]);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history })
            });
            const { reply } = await res.json();
            const botMsg: Message = { id: Date.now() + 1, sender: 'bot', text: reply };
            setMessages(prev => [...prev, botMsg]);
            setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch {
            // 2. Fallback enrichi
            const fallbackText = [
                `😅 Oups, j'ai un petit souci technique.`,
                `Voici quelques conseils en attendant :`,
                `• Pour le sport : visez 3 séances de 30 min par semaine (cardio + renfo).`,
                `• Pour la diététique : consommez 5 portions de fruits et légumes par jour.`,
                `• Hydratez-vous : au moins 1,5 L d'eau par jour.`,
                `• Sommeil : 7 à 8 h par nuit pour une meilleure récupération.`,
                `Merci pour votre compréhension !`,
            ].join('\n');
            const botMsg: Message = { id: Date.now() + 2, sender: 'bot', text: fallbackText };
            setMessages(prev => [...prev, botMsg]);
            // On désactive la saisie pour éviter les relances sans intérêt
            setDisabled(true);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">Coach Sport & Nutrition</h3>
            <div className="h-60 overflow-y-auto p-2 bg-white rounded border">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                    >
                        <div
                            className={`
                ${msg.sender === 'user'
                                    ? 'bg-[#dc5f18] text-white self-end'
                                    : 'bg-gray-200 text-gray-800 self-start'}
                rounded-md px-3 py-1 max-w-xs whitespace-pre-line
              `}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="mt-2 flex">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                    className={`flex-1 border rounded-l-lg px-3 py-2 focus:outline-none ${disabled ? 'bg-gray-200' : ''}`}
                    placeholder={disabled ? 'Conversation terminée' : 'Posez votre question...'}
                />
                <button
                    onClick={handleSend}
                    disabled={disabled}
                    className={`bg-[#0a1128] text-white px-4 rounded-r-lg hover:bg-[#081625] transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Envoyer
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
