import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import logo from './assets/logo.svg';
import { Menu, X, ArrowUp, Loader2 } from 'lucide-react';

import GlobalStyles from './styles/GlobalStyles';
import NavLink from './components/NavLink';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import CommunityPage from './pages/CommunityPage';
import GuidancePage from './pages/GuidancePage';
import AboutUsPage from './pages/AboutUsPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';

// Main App Component
const App = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [currentPage, setCurrentPage] = useState('home'); // State to manage current page

    const heroRef = useRef(null);
    const aboutRef = useRef(null);
    const testimonialsRef = useRef(null);
    const statisticsRef = useRef(null);

    const sectionRefs = useMemo(() => ({
        hero: heroRef,
        about: aboutRef,
        testimonials: testimonialsRef,
        statistics: statisticsRef,
    }), []);

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
                    <a href="/#" className="flex items-center rounded-lg px-2 py-1 hover:bg-[#21867a] transition duration-300 focus:outline-none focus:ring-2 focus:ring-white" onClick={() => handleNavigation('home')} aria-label="Al-Faruk Islamic Institute Home">
                        <img src={logo} alt="Al-Faruk Islamic Institute Logo" className="h-12 w-auto rounded-md" />
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
                {currentPage === 'events' && <EventsPage />}
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