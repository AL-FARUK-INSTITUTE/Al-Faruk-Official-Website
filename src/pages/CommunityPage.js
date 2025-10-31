
import React, { useCallback } from 'react';
import { Users, MessageSquare as CommunityIcon } from 'lucide-react';
import useInView from '../hooks/useInView';
import PillarCard from '../components/PillarCard';

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
                    <a href="/#" className="bg-[#f4a261] hover:bg-[#e76f51] text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#f4a261] focus:ring-opacity-80 text-lg uppercase tracking-wide">
                        Explore Forums
                    </a>
                </div>
            </div>
        </section>
    );
});

export default CommunityPage;
