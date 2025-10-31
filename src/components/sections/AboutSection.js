
import React, { useCallback } from 'react';
import useInView from '../../hooks/useInView';

const AboutSection = React.forwardRef((props, ref) => {
    const [inViewRef, inView] = useInView({ threshold: 0.2 });

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
        <section id="about-section" ref={setRefs} className="py-24 bg-white" aria-labelledby="about-heading">
            <div className="container mx-auto px-6 max-w-screen-xl text-center">
                <h2 id="about-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a9d8f] mb-12 relative fade-in-up ${inView ? 'is-visible' : ''}`}>
                    Our Mission
                    <span className="block w-24 h-1 bg-[#f4a261] mx-auto mt-4 rounded-full"></span>
                </h2>
                <p className={`text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                    At Al-Faruk Islamic Institute, we are dedicated to bridging the critical gap in guidance, community, and learning resources for Muslim reverts globally, with a strong commitment to empowering the growing Muslim community in Nigeria. We strive to create a safe, welcoming, and non-judgmental space where new Muslims can learn about their faith, connect with a supportive community, and find answers to their questions, empowering them on their spiritual journey.
                </p>
            </div>
        </section>
    );
});

export default AboutSection;
