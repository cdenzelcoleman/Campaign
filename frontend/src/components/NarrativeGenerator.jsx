import React, { useState, useContext } from 'react';
import { generateNarrative } from '../services/openaiService';
import { AuthContext } from '../context/AuthContext';
import './NarrativeGenerator.css';

const NarrativeGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [narrative, setNarrative] = useState('');
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext); 

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) {
            setError('Prompt cannot be empty.');
            return;
        }

        try {
            setError(''); 
            const response = await generateNarrative(prompt, token);
            setNarrative(response.narrative);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to generate narrative.');
        }
    };

    return (
        <div className="NarrativeGenerator">
            <h2>Generate Narrative</h2>
            <form onSubmit={handleGenerate}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter a prompt"
                    required
                    aria-label="Narrative Prompt"
                />
                <button type="submit">Generate</button>
            </form>
            {narrative && (
                <div className="NarrativeOutput">
                    <h3>Narrative</h3>
                    <p>{narrative}</p>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default NarrativeGenerator;
