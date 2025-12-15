import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <header className="relative h-screen min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop')] bg-cover bg-center"></div>
            
            <div className="relative z-10 container mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Plan Your Dream Trip in <br/> Minutes with AI
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                    Experience the future of travel planning. Our AI-powered platform creates personalized itineraries, finds the best activities, and helps you discover amazing destinations effortlessly.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <Link to="/planner" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg font-semibold transition shadow-lg hover:shadow-xl">
                        Start AI Planning
                    </Link>
                </div>
                <div className="mt-12 flex justify-center gap-8 text-sm font-medium text-gray-300">
                    <span className="flex items-center gap-2"><i className="fa-solid fa-star text-yellow-400"></i> 4.9/5 Rating</span>
                    <span className="flex items-center gap-2"><i className="fa-solid fa-user-group"></i> 50k+ Happy Travelers</span>
                </div>
            </div>
        </header>
    );
};

export default Hero;
