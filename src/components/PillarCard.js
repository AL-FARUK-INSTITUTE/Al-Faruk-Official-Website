
import React from 'react';
import useInView from '../hooks/useInView';

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

export default PillarCard;
