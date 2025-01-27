import React, { useState } from 'react';
import { generateNarative } from '../services/openaiService';

const NarrativeGenerator = () => {
    const [promt, setprompt] = useState('');
    const [narrative, setNarrative] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt) return;

        try {
            const response = await generateNarative(prompt, token);
            setNarrative(response.data.narrative);
        } catch (err) {
            setError('Failed to generate narative');
        }
    };

    return (
        <div>
            <h2>Generate Narative</h2>
            <form onSubmit={handleGenerate}>
                <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt"
                required
                />
                <button type="submit">Generate</button>
            </form>
            {narrative && (
                <div>
                    <h3>Narative</h3>
                    <p>{narrative}</p>
                </div>
            )}
            error && <p style={{ color: 'red' }}>{error}</p>
        </div>
    );
};

export default NarrativeGenerator;