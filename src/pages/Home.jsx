import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import Destinations from '../components/home/Destinations';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

const Home = () => {
    return (
        <div className="font-sans antialiased">
            <Navbar />
            <Hero />
            <HowItWorks />
            <Destinations />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
};

export default Home;
