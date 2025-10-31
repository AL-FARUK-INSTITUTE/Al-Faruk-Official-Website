
import React from 'react';

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

export default GlobalStyles;
