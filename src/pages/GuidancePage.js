
import React, { useState, useCallback } from 'react';
import {
    Lightbulb,
    Loader2,
    Lightbulb as GuidanceIcon,
} from 'lucide-react';
import useInView from '../hooks/useInView';
import PillarCard from '../components/PillarCard';

const GuidancePage = React.forwardRef((props, ref) => {
    const [inViewRef, inView] = useInView({ threshold: 0.1 });
    const setRefs = useCallback(node => {
        if (node) {
            inViewRef.current = node;
            if (ref) {
                if (typeof ref === 'function') {
                    ref(node);
                } else {
                    ref.current = node;
                }
            }
        }
    }, [inViewRef, ref]);

    // State for the LLM feature
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateGuidance = async () => {
        if (!question.trim()) {
            setError('Please enter a question.');
            return;
        }
        setIsGenerating(true);
        setAnswer('');
        setError('');

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: `Provide a concise Islamic answer or guidance for the following question, suitable for a Muslim revert. Keep the answer to maximum 150 words. Question: ${question}` }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will automatically provide the API key
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setAnswer(text);
            } else {
                setError('Failed to get a response from the AI. Please try again.');
                console.error('Unexpected AI response structure:', result);
            }
        } catch (err) {
            setError('An error occurred while connecting to the AI. Please check your network and try again.');
            console.error('AI API call error:', err);
        } finally {
            setIsGenerating(false);
        }
    };


    return (
        <section id="guidance-page" ref={setRefs} className="py-24 bg-[#f0f9f8]" aria-labelledby="guidance-heading">
            <div className="container mx-auto px-6 max-w-screen-xl">
                <h2 id="guidance-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a9d8f] text-center mb-16 relative fade-in-up ${inView ? 'is-visible' : ''}`}>
                    Personalized Guidance
                    <span className="block w-24 h-1 bg-[#f4a261] mx-auto mt-4 rounded-full"></span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
                    <PillarCard
                        id="mentorship-program"
                        icon={GuidanceIcon}
                        title="Mentorship Program"
                        description="Receive one-on-one mentorship from experienced Muslims and fellow reverts. Get personalized support, advice, and a listening ear for your spiritual and personal journey, with mentors available in Nigeria."
                        points={[
                            "Connect with Mentors",
                            "Guidance on Islamic Practice",
                            "Personalized Support"
                        ]}
                    />
                    <PillarCard
                        id="ask-an-expert"
                        icon={Lightbulb}
                        title="Ask an Expert"
                        description="Submit your questions to qualified scholars and experienced mentors. Get reliable, authentic answers to your queries about Islamic rulings, practices, and life challenges, including insights from Nigerian scholars."
                        points={[
                            "Direct Q&A with Scholars",
                            "Browse FAQs",
                            "Confidential Consultations"
                        ]}
                    />
                </div>

                {/* Instant Islamic Guidance Feature */}
                <div className={`bg-white p-10 rounded-2xl shadow-xl fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.8s' }}>
                    <h3 className="text-3xl font-bold text-[#2a9d8f] mb-8 text-center">Instant Islamic Guidance ✨</h3>
                    <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
                        Have a quick question about Islam? Type it below and get an instant, AI-powered response.
                    </p>
                    <div className="mb-6">
                        <label htmlFor="ai-question" className="block text-gray-700 text-lg font-medium mb-2">Your Question:</label>
                        <textarea
                            id="ai-question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            rows="4"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] transition duration-200"
                            placeholder="e.g., What is the importance of Zakat in Islam?"
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-2" role="alert">{error}</p>}
                    </div>
                    <button
                        onClick={handleGenerateGuidance}
                        disabled={isGenerating}
                        className="w-full bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-75 text-xl uppercase tracking-wide flex items-center justify-center"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="animate-spin mr-3 w-6 h-6" /> Generating...
                            </>
                        ) : (
                            'Get Guidance ✨'
                        )}
                    </button>

                    {answer && (
                        <div className="mt-8 p-6 bg-[#f0f9f8] border border-[#2a9d8f] rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold text-[#264653] mb-4">AI Response:</h4>
                            <p className="text-gray-800 leading-relaxed">{answer}</p>
                            <p className="text-sm text-gray-500 mt-4 italic">
                                Disclaimer: This AI-generated response is for informational purposes only and should not replace consultation with qualified Islamic scholars.
                            </p>
                        </div>
                    )}
                </div>

                <div className={`mt-20 text-center fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
                    <h3 className="text-3xl font-bold text-[#264653] mb-6">Seek Knowledge and Support</h3>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Our dedicated mentors and scholars are here to guide you every step of the way.
                    </p>
                    <a href="/#" className="bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-80 text-lg uppercase tracking-wide">
                        Find a Mentor
                    </a>
                </div>
            </div>
        </section>
    );
});

export default GuidancePage;
