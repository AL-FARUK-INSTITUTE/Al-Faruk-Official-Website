
import React, { useCallback } from 'react';
import { Book, GraduationCap as LearnIcon } from 'lucide-react';
import useInView from '../hooks/useInView';
import PillarCard from '../components/PillarCard';

const LearnPage = React.forwardRef((props, ref) => {
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

    return (
        <section id="learn-page" ref={setRefs} className="py-24 bg-[#f0f9f8]" aria-labelledby="learn-heading">
            <div className="container mx-auto px-6 max-w-screen-xl">
                <h2 id="learn-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a9d8f] text-center mb-16 relative fade-in-up ${inView ? 'is-visible' : ''}`}>
                    Learn & Educate
                    <span className="block w-24 h-1 bg-[#f4a261] mx-auto mt-4 rounded-full"></span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <PillarCard
                        id="structured-education"
                        icon={Book}
                        title="Structured Courses"
                        description="Access clear, step-by-step guides on essential Islamic fundamentals, from prayer to Quranic studies. Our curriculum prioritizes practical worship and foundational knowledge, ensuring a solid understanding of your faith, with content relevant to the Nigerian context."
                        points={[
                            "Beginner Islamic Courses",
                            "Intermediate Studies",
                            "Advanced Topics"
                        ]}
                    />
                    <PillarCard
                        id="resource-library"
                        icon={LearnIcon}
                        title="Resource Library"
                        description="Explore a curated collection of authentic Islamic literature, articles, and media. Find reliable Quran translations, foundational books, and scholarly insights to deepen your knowledge, including resources from Nigerian scholars."
                        points={[
                            "Recommended Books & Articles",
                            "Fatwa & Q&A Database",
                            "Scholarly Papers"
                        ]}
                    />
                </div>
                <div className={`mt-20 text-center fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
                    <h3 className="text-3xl font-bold text-[#264653] mb-6">Start Your Learning Journey Today!</h3>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Dive into our comprehensive courses designed for reverts, or browse our extensive library of resources.
                    </p>
                    <a href="/#" className="bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-80 text-lg uppercase tracking-wide">
                        View All Courses
                    </a>
                </div>
            </div>
        </section>
    );
});

export default LearnPage;
