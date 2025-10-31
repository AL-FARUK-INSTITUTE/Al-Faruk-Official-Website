
import React, { useCallback } from 'react';
import { Quote } from 'lucide-react';
import useInView from '../../hooks/useInView';

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

export default TestimonialsSection;
