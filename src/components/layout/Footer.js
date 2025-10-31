import React from 'react';

const Footer = () => (
    <footer className="bg-[#2a9d8f] py-12 text-white text-center" role="contentinfo">
        <div className="container mx-auto px-6 max-w-screen-xl">
            <p className="text-lg mb-6">&copy; {new Date().getFullYear()} Al-Faruk Islamic Institute. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4">
                <a href="/#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1">Privacy Policy</a>
                <a href="/#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1">Terms of Service</a>
                <a href="/#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1" aria-label="Visit us on Facebook">Facebook</a>
                <a href="/#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1" aria-label="Visit us on Twitter">Twitter</a>
                <a href="/#" className="hover:text-gray-200 transition duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1" aria-label="Visit us on Instagram">Instagram</a>
            </div>
        </div>
    </footer>
);

export default Footer;