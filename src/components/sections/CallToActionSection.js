
import React from 'react';
import { ChevronRight } from 'lucide-react';
import useInView from '../../hooks/useInView';

const CallToActionSection = ({ scrollToPage }) => {
    const [inViewRef, inView] = useInView({ threshold: 0.2 });
    return (
        <section ref={inViewRef} className="py-24 bg-[#2a9d8f] text-white text-center">
            <div className="container mx-auto px-6 max-w-screen-lg">
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-10 fade-in-up ${inView ? 'is-visible' : ''}`}>Ready to Deepen Your Faith?</h2>
                <p className={`text-xl md:text-2xl lg:text-3xl mb-12 max-w-3xl mx-auto font-light fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                    Join Al-Faruk Islamic Institute today and embark on a journey of knowledge, community, and spiritual growth.
                </p>
                <button onClick={() => scrollToPage('contact')} className="bg-[#e9c46a] hover:bg-[#f4a261] text-[#264653] font-bold py-4 px-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#e9c46a] focus:ring-opacity-80 text-xl tracking-wide uppercase"
                    aria-label="Join Us by navigating to the contact section">
                    Join Us
                    <ChevronRight className="inline-block ml-3 w-6 h-6" />
                </button>
            </div>
        </section>
    );
};

export default CallToActionSection;
