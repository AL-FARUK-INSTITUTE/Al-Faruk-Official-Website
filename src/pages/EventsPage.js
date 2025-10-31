
import React from 'react';
import EventsLecturesSection from '../components/sections/EventsLecturesSection';

const EventsPage = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <EventsLecturesSection />
        </div>
    );
});

export default EventsPage;
