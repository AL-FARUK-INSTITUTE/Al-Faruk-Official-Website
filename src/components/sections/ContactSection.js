
import React, { useState, useCallback } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import useInView from '../../hooks/useInView';

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

export default ContactSection;
