
import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import StatisticsSection from '../components/sections/StatisticsSection';
import CallToActionSection from '../components/sections/CallToActionSection';

const HomePage = React.forwardRef(({ scrollToPage, sectionRefs }, ref) => {
    return (
        <div ref={ref}>
            <HeroSection scrollToPage={scrollToPage} ref={sectionRefs.hero} />
            <AboutSection ref={sectionRefs.about} />
            <TestimonialsSection ref={sectionRefs.testimonials} />
            <StatisticsSection ref={sectionRefs.statistics} />
            <CallToActionSection scrollToPage={scrollToPage} />
        </div>
    );
});

export default HomePage;
