
import React from 'react';
import AboutSection from '../components/sections/AboutSection';
import StatisticsSection from '../components/sections/StatisticsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const AboutUsPage = React.forwardRef(({ sectionRefs }, ref) => {
    return (
        <div ref={ref}>
            <AboutSection ref={sectionRefs.about} />
            <StatisticsSection ref={sectionRefs.statistics} />
            <TestimonialsSection ref={sectionRefs.testimonials} />
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-6 max-w-screen-xl">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a9d8f] mb-12 relative">
                        Our Vision
                        <span className="block w-24 h-1 bg-[#f4a261] mx-auto mt-4 rounded-full"></span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        To be the leading global platform empowering Muslim reverts with authentic knowledge, a supportive community, and personalized guidance to thrive in their faith and contribute positively to society, with a strong foundation and impact within Nigeria.
                    </p>
                </div>
            </section>
        </div>
    );
});

export default AboutUsPage;
