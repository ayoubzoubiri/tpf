import React from 'react';
import { Link } from 'react-router-dom';

const FooterCTA = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">Join thousands of travelers who trust Toplago to plan their perfect trips. Get personalized itineraries in minutes.</h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
                    <Link to="/planner" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-bold transition">
                        Start AI Planning
                    </Link>
                    <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white text-lg px-8 py-3 rounded-lg font-bold transition">
                        Watch Demo
                    </button>
                </div>
                <div className="flex justify-center gap-12 text-center">
                    <div>
                        <div className="text-3xl font-bold">50K+</div>
                        <div className="text-blue-100 text-sm">Happy Travelers</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold">150K+</div>
                        <div className="text-blue-100 text-sm">Trips Planned</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold">4.9/5</div>
                        <div className="text-blue-100 text-sm">Average Rating</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterCTA;
