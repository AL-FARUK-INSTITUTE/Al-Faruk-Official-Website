
import React, { useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import useInView from '../../hooks/useInView';

const HeroSection = React.forwardRef(({ scrollToPage }, ref) => {
    const [inViewRef, inView] = useInView({ threshold: 0.3 });

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

    return (
        <section id="hero-section" ref={setRefs} className="relative min-h-[600px] flex items-center justify-center text-center text-white bg-[#2a9d8f] overflow-hidden">
            <div className="overlay absolute inset-0 bg-black bg-opacity-65"></div>
            <div className={`relative z-10 p-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-up ${inView ? 'is-visible' : ''}`}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight drop-shadow-2xl">
                    Welcome to Al-Faruk Islamic Institute
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-12 drop-shadow-lg font-light max-w-4xl mx-auto">
                    A leading institution dedicated to providing comprehensive guidance, fostering vibrant community, and delivering structured learning for Muslim reverts globally, with a significant emphasis on empowering the Nigerian Muslim community.
                </p>
                <button
                    onClick={() => scrollToPage('learn')} // Changed to navigate to 'learn' page
                    className="bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-4 px-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-80 text-xl tracking-wide uppercase"
                    aria-label="Start Your Journey to Education"
                >
                    Start Your Journey
                    <ChevronRight className="inline-block ml-3 w-6 h-6" />
                </button>
            </div>
        </section>
    );
});

export default HeroSection;
