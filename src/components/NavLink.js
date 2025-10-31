
import React from 'react';

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

export default NavLink;
