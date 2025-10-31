
import React, { useCallback } from 'react';
import { Calendar, MapPin, ChevronRight, Link as LinkIcon } from 'lucide-react';
import useInView from '../../hooks/useInView';

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

export default EventsLecturesSection;
