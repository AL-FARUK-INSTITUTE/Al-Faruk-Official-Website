import React, { useState, useEffect, useRef, useCallback } from 'react';

// Importing icons from lucide-react
import { Book, Users, Lightbulb, Menu, X, ChevronRight, ArrowUp, Quote, Globe, GraduationCap, Phone, Mail, MapPin, Loader2, Calendar, Link as LinkIcon, GraduationCap as LearnIcon, MessageSquare as CommunityIcon, Lightbulb as GuidanceIcon } from 'lucide-react';


// Define custom animations for scroll-triggered effects
const GlobalStyles = () => (
    <style>
        {`
        html {
            scroll-behavior: smooth;
        }
        /* Base state for elements that will animate in */
        .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        /* Final state when visible */
        .fade-in-up.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        .scale-in {
            opacity: 0;
            transform: scale(0.9);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .scale-in.is-visible {
            opacity: 1;
            transform: scale(1);
        }
        .slide-in-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .slide-in-left.is-visible {
            opacity: 1;
            transform: translateX(0);
        }
        .slide-in-right {
            opacity: 0;
            transform: translateX(50px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .slide-in-right.is-visible {
            opacity: 1;
            transform: translateX(0);
        }
        `}
    </style>
);

// Custom Hook for Intersection Observer
const useInView = (options) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target); // Stop observing once visible
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

// NavLink Component for reusability and improved styling
const NavLink = ({ to, onClick, children, isMobile = false, isActive }) => (
    <a
        href={`#${to}`} // Keep href for semantic and fallback
        className={`${isMobile ? 'block px-6 py-3 text-xl font-medium' : 'px-4 py-2 text-lg font-medium'}
                   ${isActive ? 'text-white bg-[#21867a] rounded-lg' : 'text-white hover:text-gray-100 hover:bg-[#21867a]'}
                   transition duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#2a9d8f]`}
        onClick={(e) => {
            e.preventDefault();
            onClick(to);
        }}
        aria-label={`Maps to ${children} section`}
        role="menuitem"
    >
        {children}
    </a>
);

// Hero Section Component
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

// About Section Component (now part of HomePage)
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

// Pillar Card Component (used on Learn, Community, Guidance pages)
const PillarCard = ({ id, icon: Icon, title, description, points }) => {
    const [inViewRef, inView] = useInView({ threshold: 0.3 });
    return (
        <div id={id} ref={inViewRef} className={`bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-4 flex flex-col items-center text-center border border-gray-100 cursor-pointer group scale-in ${inView ? 'is-visible' : ''}`}>
            <div className="mb-8">
                <Icon className="w-24 h-24 text-[#f4a261] mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="text-3xl lg:text-4xl font-bold text-[#2a9d8f] group-hover:text-[#21867a] transition-colors duration-300">{title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-8 flex-grow">{description}</p>
            <ul className="list-disc list-inside text-gray-600 space-y-3 text-left w-full pl-4">
                {points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    );
};


// Testimonials Section Component (now part of HomePage)
const TestimonialsSection = React.forwardRef((props, ref) => {
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

    const testimonials = [
        {
            quote: "Joining Al-Faruk Islamic Institute was the best decision I made after reverting. The structured lessons and supportive community made my journey so much easier.",
            author: "Aisha K., USA"
        },
        {
            quote: "I finally found a place where I feel understood and can ask questions without judgment. The mentorship program is invaluable!",
            author: "Omar S., UK"
        },
        {
            quote: "The resources here are authentic and easy to understand. It's truly a blessing for new Muslims like me.",
            author: "Fatima R., Canada"
        }
    ];

    return (
        <section id="testimonials-section" ref={setRefs} className="py-24 bg-white" aria-labelledby="testimonials-heading">
            <div className="container mx-auto px-6 max-w-screen-xl text-center">
                <h2 id="testimonials-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a9d8f] mb-16 relative fade-in-up ${inView ? 'is-visible' : ''}`}>
                    What Our Community Says
                    <span className="block w-24 h-1 bg-[#f4a261] mx-auto mt-4 rounded-full"></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`bg-[#f0f9f8] p-8 rounded-2xl shadow-md flex flex-col items-center justify-between scale-in ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                            <Quote className="w-12 h-12 text-[#f4a261] mb-6" aria-hidden="true" />
                            <p className="text-lg text-gray-800 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                            <p className="font-semibold text-[#264653]">- {testimonial.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

// Statistics Section Component (now part of HomePage)
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

// Call to Action Section Component (now part of HomePage)
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

// Events & Lectures Section Component (now its own page, fetches from Firestore)
const EventsLecturesSection = React.forwardRef((props, ref) => {
    const [inViewRef, inView] = useInView({ threshold: 0.1 });
    // Static event data
    const events = [
        {
            id: '1',
            title: 'Foundations of Islam Workshop',
            description: 'An introductory workshop covering the core beliefs and practices of Islam.',
            date: '2025-08-15',
            time: '10:00 AM',
            location: 'Lagos Central Mosque, Lagos, Nigeria',
            link: '#',
            speaker: 'Dr. Amina Yusuf'
        },
        {
            id: '2',
            title: 'Q&A with Revert Sisters',
            description: 'An open session for revert sisters to ask questions and share experiences.',
            date: '2025-09-01',
            time: '07:00 PM',
            location: 'Online (Zoom)',
            link: '#',
            speaker: 'Sr. Khadija Ali'
        },
        {
            id: '3',
            title: 'Understanding the Quran Series: Part 1',
            description: 'Beginner-friendly series on the basics of Quranic interpretation and its importance.',
            date: '2025-09-10',
            time: '06:00 PM',
            location: 'Abuja Islamic Center, Abuja, Nigeria',
            link: '#',
            speaker: 'Ustadh Bilal Kareem'
        },
        {
            id: '4',
            title: 'Prophet Muhammad (PBUH) - The Merciful Leader',
            description: 'A lecture on the life and lessons from the final prophet of Islam.',
            date: '2024-11-20', // Past event
            time: '04:00 PM',
            location: 'Online (YouTube)',
            link: 'https://www.youtube.com/watch?v=example1',
            speaker: 'Shaykh Abdullah Mansour'
        },
        {
            id: '5',
            title: 'The Beauty of Islamic Art & Architecture',
            description: 'Exploring the rich history and aesthetics of Islamic art.',
            date: '2024-10-05', // Past event
            time: '02:00 PM',
            location: 'Virtual Exhibit',
            link: 'https://www.example.com/art-exhibit',
            speaker: 'Dr. Sara Ahmed'
        },
    ];

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

    const upcomingEvents = events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const pastLectures = events
        .filter(event => new Date(event.date) < new Date())
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent first

    return (
        <section id="events-lectures-section" ref={setRefs} className="py-24 bg-white" aria-labelledby="events-lectures-heading">
            <div className="container mx-auto px-6 max-w-screen-xl">
                <h2 id="events-lectures-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a9d8f] text-center mb-16 relative fade-in-up ${inView ? 'is-visible' : ''}`}>
                    Events & Lectures
                    <span className="block w-24 h-1 bg-[#f4a261] mx-auto mt-4 rounded-full"></span>
                </h2>

                {/* Upcoming Events */}
                <div className="mb-20">
                    <h3 className={`text-3xl md:text-4xl font-bold text-[#264653] mb-10 text-center relative fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
                        Upcoming Events & Workshops
                        <span className="block w-16 h-1 bg-[#e9c46a] mx-auto mt-3 rounded-full"></span>
                    </h3>
                    {upcomingEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {upcomingEvents.map((event, index) => (
                                <div key={event.id} className={`bg-[#f0f9f8] p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 scale-in ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: `${0.2 + index * 0.1}s` }}>
                                    <h4 className="text-2xl font-semibold text-[#2a9d8f] mb-3">{event.title}</h4>
                                    <p className="text-gray-700 mb-4">{event.description}</p>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <Calendar className="w-5 h-5 mr-2 text-[#f4a261]" aria-hidden="true" />
                                        <span>{event.date} at {event.time}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <MapPin className="w-5 h-5 mr-2 text-[#f4a261]" aria-hidden="true" />
                                        <span>{event.location}</span>
                                    </div>
                                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#f4a261] hover:text-[#e76f51] font-medium transition duration-300">
                                        Learn More <ChevronRight className="ml-1 w-4 h-4" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={`text-center text-gray-600 text-lg fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
                            No upcoming events at the moment. Please check back soon!
                        </p>
                    )}
                </div>

                {/* Past Lectures */}
                <div>
                    <h3 className={`text-3xl md:text-4xl font-bold text-[#264653] mb-10 text-center relative fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.4s'}}>
                        {'Past Lectures & Resources'}
                        <span className="block w-16 h-1 bg-[#e9c46a] mx-auto mt-3 rounded-full"></span>
                    </h3>
                    {pastLectures.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastLectures.map((lecture, index) => (
                                <div key={lecture.id} className={`bg-[#f0f9f8] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 scale-in ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: `${0.5 + index * 0.1}s` }}>
                                    <h4 className="text-xl font-semibold text-[#2a9d8f] mb-2">{lecture.title}</h4>
                                    <p className="text-gray-700 text-sm mb-1">Speaker: {lecture.speaker}</p>
                                    <p className="text-gray-600 text-sm mb-4">Date: {lecture.date}</p>
                                    <a href={lecture.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#f4a261] hover:text-[#e76f51] font-medium transition duration-300">
                                        Watch Lecture <LinkIcon className="ml-1 w-4 h-4" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={`text-center text-gray-600 text-lg fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
                            No past lectures available yet. Check back for updates!
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
});


// Contact Section Component (now its own page)
const ContactSection = React.forwardRef((props, ref) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log('Form submitted:', formData);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
        }
    };

    return (
        <section id="contact-section" ref={setRefs} className="py-24 bg-white" aria-labelledby="contact-heading">
            <div className="container mx-auto px-6 max-w-screen-xl">
                <h2 id="contact-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a9d8f] text-center mb-16 relative fade-in-up ${inView ? 'is-visible' : ''}`}>
                    Get in Touch
                    <span className="block w-24 h-1 bg-[#f4a261] mx-auto mt-4 rounded-full"></span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className={`space-y-8 slide-in-left ${inView ? 'is-visible' : ''}`}>
                        <div className="flex items-start">
                            <Mail className="w-8 h-8 text-[#f4a261] mr-4 flex-shrink-0" aria-hidden="true" />
                            <div>
                                <h3 className="text-2xl font-semibold text-[#264653] mb-2">Email Us</h3>
                                <p className="text-lg text-gray-700">info@alfaruk.org</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Phone className="w-8 h-8 text-[#f4a261] mr-4 flex-shrink-0" aria-hidden="true" />
                            <div>
                                <h3 className="text-2xl font-semibold text-[#264653] mb-2">Call Us</h3>
                                <p className="text-lg text-gray-700">+234 801 234 5678</p> {/* Nigerian phone number */}
                            </div>
                        </div>
                        <div className="flex items-start">
                            <MapPin className="w-8 h-8 text-[#f4a261] mr-4 flex-shrink-0" aria-hidden="true" />
                            <div>
                                <h3 className="text-2xl font-semibold text-[#264653] mb-2">Our Location</h3>
                                <p className="text-lg text-gray-700">123 Islamic Way, Lagos, Nigeria</p> {/* Nigerian location */}
                            </div>
                        </div>
                    </div>

                    <div className={`bg-[#f0f9f8] p-10 rounded-2xl shadow-xl slide-in-right ${inView ? 'is-visible' : ''}`}>
                        <h3 className="text-3xl font-bold text-[#2a9d8f] mb-8">Send Us a Message</h3>
                        {isSubmitted && (
                            <div role="alert" className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" aria-live="polite">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline ml-2">Your message has been sent. We will get back to you soon.</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-4 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] transition duration-200`}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    aria-describedby={errors.name ? "name-error" : null}
                                />
                                {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name}</p>}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-4 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] transition duration-200`}
                                    aria-invalid={errors.email ? "true" : "false"}
                                    aria-describedby={errors.email ? "email-error" : null}
                                />
                                {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>}
                            </div>
                            <div className="mb-8">
                                <label htmlFor="message" className="block text-gray-700 text-lg font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className={`w-full p-4 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] transition duration-200`}
                                    aria-invalid={errors.message ? "true" : "false"}
                                    aria-describedby={errors.message ? "message-error" : null}
                                ></textarea>
                                {errors.message && <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-75 text-xl uppercase tracking-wide"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
});

// Footer Component
const Footer = () => (
    <footer className="bg-[#2a9d8f] py-12 text-white text-center" role="contentinfo">
        <div className="container mx-auto px-6 max-w-screen-xl">
            <p className="text-lg mb-6">&copy; {new Date().getFullYear()} Al-Faruk Islamic Institute. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4">
                <a href="#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1">Privacy Policy</a>
                <a href="#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1">Terms of Service</a>
                <a href="#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1" aria-label="Visit us on Facebook">Facebook</a>
                <a href="#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1" aria-label="Visit us on Twitter">Twitter</a>
                <a href="#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1" aria-label="Visit us on Instagram">Instagram</a>
            </div>
        </div>
    </footer>
);


// --- PAGE COMPONENTS (DEFINED BEFORE APP) ---

// Home Page Component
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

// Learn Page Component
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
                    <a href="#" className="bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-80 text-lg uppercase tracking-wide">
                        View All Courses
                    </a>
                </div>
            </div>
        </section>
    );
});

// Community Page Component
const CommunityPage = React.forwardRef((props, ref) => {
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
        <section id="community-page" ref={setRefs} className="py-24 bg-white" aria-labelledby="community-heading">
            <div className="container mx-auto px-6 max-w-screen-xl">
                <h2 id="community-heading" className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a9d8f] text-center mb-16 relative fade-in-up ${inView ? 'is-visible' : ''}`}>
                    Vibrant Community
                    <span className="block w-24 h-1 bg-[#f4a261] mx-auto mt-4 rounded-full"></span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <PillarCard
                        id="discussion-forums"
                        icon={CommunityIcon}
                        title="Discussion Forums"
                        description="Connect with fellow reverts and supportive Muslims in a safe, non-judgmental environment. Share experiences, ask questions, and engage in respectful dialogue on various Islamic topics, including those relevant to Nigerian Muslims."
                        points={[
                            "Moderated Topics",
                            "Peer-to-Peer Support",
                            "New Revert Introductions"
                        ]}
                    />
                    <PillarCard
                        id="peer-support-groups"
                        icon={Users}
                        title="Peer Support Groups"
                        description="Join virtual or local peer support groups facilitated by experienced Muslims. Find a sense of family and belonging through shared journeys and mutual encouragement, with a focus on establishing groups in Nigerian cities."
                        points={[
                            "Virtual Meetups",
                            "Local Group Directory (Nigeria)",
                            "Confidential Spaces"
                        ]}
                    />
                </div>
                <div className={`mt-20 text-center fade-in-up ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
                    <h3 className="text-3xl font-bold text-[#264653] mb-6">Join Our Growing Family</h3>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Become a part of our supportive community and find the brotherhood and sisterhood you've been searching for.
                    </p>
                    <a href="#" className="bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-80 text-lg uppercase tracking-wide">
                        Explore Forums
                    </a>
                </div>
            </div>
        </section>
    );
});

// Guidance Page Component
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
                    <a href="#" className="bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-80 text-lg uppercase tracking-wide">
                        Find a Mentor
                    </a>
                </div>
            </div>
        </section>
    );
});


// About Us Page Component
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

// Events Page Component
const EventsPage = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <EventsLecturesSection />
        </div>
    );
});

// Contact Page Component
const ContactPage = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <ContactSection />
        </div>
    );
});


// Main App Component
const App = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [currentPage, setCurrentPage] = useState('home'); // State to manage current page

    // Refs for sections on the Home Page to determine active navigation link
    const sectionRefs = {
        hero: useRef(null),
        about: useRef(null),
        testimonials: useRef(null),
        statistics: useRef(null),
    };

    // Simulate initial content loading
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []); // Run only once on mount

    // Function to handle navigation and scrolling
    const handleNavigation = useCallback((targetPage) => {
        setCurrentPage(targetPage);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of new page
        setIsMobileMenuOpen(false);
    }, []);


    // Scroll-to-top button visibility and active section logic
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }

            // Section tracking logic can be added here if needed in the future
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage, sectionRefs]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f8f8f5]">
                <Loader2 className="animate-spin w-16 h-16 text-[#2a9d8f]" />
                <p className="ml-4 text-xl text-gray-700">Loading Al-Faruk Islamic Institute...</p>
            </div>
        );
    }

    return (
        <div className="antialiased font-inter bg-[#f8f8f5] text-[#333]">
            <GlobalStyles />

            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-[#2a9d8f] focus:text-white focus:p-3 focus:rounded-br-lg">
                Skip to main content
            </a>

            <nav className="bg-[#2a9d8f] p-4 shadow-xl fixed w-full z-50 top-0 transition-all duration-300 ease-in-out" role="navigation" aria-label="Main Navigation">
                <div className="container mx-auto flex justify-between items-center max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <a href="#" className="flex items-center rounded-lg px-2 py-1 hover:bg-[#21867a] transition duration-300 focus:outline-none focus:ring-2 focus:ring-white" onClick={() => handleNavigation('home')} aria-label="Al-Faruk Islamic Institute Home">
                        <img src="http://googleusercontent.com/file_content/2" alt="Al-Faruk Islamic Institute Logo" className="h-12 w-auto rounded-md" />
                    </a>
                    <div className="hidden md:flex space-x-10">
                        <NavLink to="home" onClick={handleNavigation} isActive={currentPage === 'home'}>Home</NavLink>
                        <NavLink to="learn" onClick={handleNavigation} isActive={currentPage === 'learn'}>Learn</NavLink>
                        <NavLink to="community" onClick={handleNavigation} isActive={currentPage === 'community'}>Community</NavLink>
                        <NavLink to="guidance" onClick={handleNavigation} isActive={currentPage === 'guidance'}>Guidance</NavLink>
                        <NavLink to="events" onClick={handleNavigation} isActive={currentPage === 'events'}>Events</NavLink>
                        <NavLink to="about-us" onClick={handleNavigation} isActive={currentPage === 'about-us'}>About Us</NavLink>
                        <NavLink to="contact" onClick={handleNavigation} isActive={currentPage === 'contact'}>Contact</NavLink>
                    </div>
                    <button
                        id="mobile-menu-button"
                        className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2 transition duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
                {isMobileMenuOpen && (
                    <div
                        id="mobile-menu"
                        className="md:hidden bg-[#2a9d8f] mt-2 py-4 rounded-lg shadow-2xl mx-4 transition-all duration-300 ease-in-out transform origin-top"
                        style={{ maxHeight: isMobileMenuOpen ? '500px' : '0', opacity: isMobileMenuOpen ? '1' : '0', overflow: 'hidden' }}
                        role="menu"
                    >
                        <NavLink to="home" onClick={handleNavigation} isMobile isActive={currentPage === 'home'}>Home</NavLink>
                        <NavLink to="learn" onClick={handleNavigation} isMobile isActive={currentPage === 'learn'}>Learn</NavLink>
                        <NavLink to="community" onClick={handleNavigation} isMobile isActive={currentPage === 'community'}>Community</NavLink>
                        <NavLink to="guidance" onClick={handleNavigation} isMobile isActive={currentPage === 'guidance'}>Guidance</NavLink>
                        <NavLink to="events" onClick={handleNavigation} isMobile isActive={currentPage === 'events'}>Events</NavLink>
                        <NavLink to="about-us" onClick={handleNavigation} isMobile isActive={currentPage === 'about-us'}>About Us</NavLink>
                        <NavLink to="contact" onClick={handleNavigation} isMobile isActive={currentPage === 'contact'}>Contact</NavLink>
                    </div>
                )}
            </nav>

            <main id="main-content" className="pt-24" role="main">
                {currentPage === 'home' && <HomePage scrollToPage={handleNavigation} sectionRefs={sectionRefs} />}
                {currentPage === 'learn' && <LearnPage />}
                {currentPage === 'community' && <CommunityPage />}
                {currentPage === 'guidance' && <GuidancePage />}
                {currentPage === 'events' && <EventsPage />} {/* No db prop needed now */}
                {currentPage === 'about-us' && <AboutUsPage sectionRefs={sectionRefs} />}
                {currentPage === 'contact' && <ContactPage />}
            </main>

            <Footer />

            {showScrollToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 bg-[#f4a261] text-white p-4 rounded-full shadow-lg hover:bg-[#e76f51] transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-75 z-40"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default App;
