
import React, { useState, useEffect, useCallback } from 'react';
import { GraduationCap, Globe, Book } from 'lucide-react';
import useInView from '../../hooks/useInView';

const StatisticsSection = React.forwardRef((props, ref) => {
    const [inViewRef, inView] = useInView({ threshold: 0.3, triggerOnce: true });
    const [stats, setStats] = useState({ students: 0, countries: 0, courses: 0 });

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

    useEffect(() => {
        if (inView) {
            const animateNumber = (target, setter, duration = 1000) => {
                let start = 0;
                const increment = target / (duration / 50);
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= target) {
                        setter(target);
                        clearInterval(timer);
                    } else {
                        setter(Math.ceil(start));
                    }
                }, 50);
                return () => clearInterval(timer);
            };

            animateNumber(5000, (val) => setStats(prev => ({ ...prev, students: val })));
            animateNumber(75, (val) => setStats(prev => ({ ...prev, countries: val })), 1200);
            animateNumber(20, (val) => setStats(prev => ({ ...prev, courses: val })), 1400);
        }
    }, [inView]);

    return (
        <section id="statistics-section" ref={setRefs} className="py-24 bg-[#264653] text-white" aria-labelledby="statistics-heading">
            <div className="container mx-auto px-6 max-w-screen-xl text-center">
                <h2 id="statistics-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-16 relative fade-in-up ${inView ? 'is-visible' : ''}`}>
                    Our Impact
                    <span className="block w-24 h-1 bg-[#e9c46a] mx-auto mt-4 rounded-full"></span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                    <div className={`p-6 rounded-xl bg-white bg-opacity-10 shadow-lg slide-in-left ${inView ? 'is-visible' : ''}`}>
                        <GraduationCap className="w-16 h-16 mx-auto text-[#e9c46a] mb-4" aria-hidden="true" />
                        <p className="text-5xl font-extrabold">{stats.students}+</p>
                        <p className="text-xl mt-2">Students Enrolled</p>
                    </div>
                    <div className={`p-6 rounded-xl bg-white bg-opacity-10 shadow-lg fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                        <Globe className="w-16 h-16 mx-auto text-[#e9c46a] mb-4" aria-hidden="true" />
                        <p className="text-5xl font-extrabold">{stats.countries}+</p>
                        <p className="text-xl mt-2">Countries Reached</p>
                    </div>
                    <div className={`p-6 rounded-xl bg-white bg-opacity-10 shadow-lg slide-in-right ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
                        <Book className="w-16 h-16 mx-auto text-[#e9c46a] mb-4" aria-hidden="true" />
                        <p className="text-5xl font-extrabold">{stats.courses}+</p>
                        <p className="text-xl mt-2">Courses Offered</p>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default StatisticsSection;
