
import React from 'react';
import ContactSection from '../components/sections/ContactSection';

const ContactPage = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <ContactSection />
        </div>
    );
});

export default ContactPage;
