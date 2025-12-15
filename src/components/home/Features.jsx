import React from 'react';

const Features = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Powered by the Best Technology</h2>
                <p className="text-gray-600 mb-16 max-w-2xl mx-auto">We combine cutting-edge AI with trusted travel platforms to deliver the ultimate planning experience.</p>
                
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Smart Itineraries</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">Powered by Gemini AI to create personalized travel plans that adapt to your preferences, budget, and travel style.</p>
                        <div className="flex justify-between items-center">
                            <div className="text-blue-600 text-xs font-semibold uppercase tracking-wide">Gemini AI</div>
                            <a href="#" className="text-blue-600 text-sm font-semibold hover:underline">Learn +</a>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            <i className="fa-solid fa-ticket"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Top Activities</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">Access thousands of curated tours and activities from Viator, the world's leading travel experiences marketplace.</p>
                        <div className="flex justify-between items-center">
                            <div className="text-purple-600 text-xs font-semibold uppercase tracking-wide">Viator</div>
                            <a href="#" className="text-purple-600 text-sm font-semibold hover:underline">Learn +</a>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Trusted Reviews</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">Make informed decisions with millions of authentic reviews and ratings from TripAdvisor travelers worldwide.</p>
                        <div className="flex justify-between items-center">
                            <div className="text-green-600 text-xs font-semibold uppercase tracking-wide">TripAdvisor</div>
                            <a href="#" className="text-green-600 text-sm font-semibold hover:underline">Learn +</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
