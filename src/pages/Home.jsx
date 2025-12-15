import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import TrendingDestinations from '../components/home/TrendingDestinations';
import BlogPreview from '../components/home/BlogPreview';
import FooterCTA from '../components/home/FooterCTA';

const Home = () => {
    return (
        <div className="font-sans text-gray-900">
            <Navbar />
            <Hero />
            <Features />
            <TrendingDestinations />
            <BlogPreview />
            <FooterCTA />
            <Footer />
        </div>
    );
};

export default Home;
