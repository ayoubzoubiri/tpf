import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-16 bg-blue-600">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Ready to give it a try?
                </h2>
                <p className="text-blue-100 mb-8 max-w-md mx-auto">
                    See how Toplago can turn any idea into a trip in under a minute.
                </p>
                <Link 
                    to="/planner"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition"
                >
                    Start Planning
                    <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </div>
        </section>
    );
};

export default CTA;
