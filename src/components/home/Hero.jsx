import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const categories = [
        { label: 'Beach', icon: '🏖️' },
        { label: 'City', icon: '🏙️' },
        { label: 'Adventure', icon: '🏔️' },
        { label: 'Cultural', icon: '🏛️' },
        { label: 'Romantic', icon: '💕' },
        { label: 'Family', icon: '👨‍👩‍👧‍👦' },
    ];

    const destinations = [
        { name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
        { name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
        { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
        { name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80' },
    ];

    return (
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
            {/* Hero Content */}
            <div className="container mx-auto px-6 pt-16 pb-12">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                        Hey, I'm <span className="text-blue-400">Toplago</span>,
                        <br />your AI trip planner
                    </h1>
                    <p className="text-slate-400 text-lg mb-8">
                        Tell me your style and budget, and I'll design a trip for you.
                    </p>

                    {/* Search Box */}
                    <div className="bg-white rounded-2xl p-2 mb-6 shadow-2xl">
                        <Link to="/planner" className="flex items-center">
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 text-left">
                                <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
                                <span className="text-slate-400">Where do you want to go?</span>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition">
                                Plan Trip
                            </button>
                        </Link>
                    </div>

                    {/* Category Tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map((cat, i) => (
                            <Link 
                                key={i}
                                to={`/planner?interest=${cat.label}`}
                                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full text-sm transition"
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="max-w-2xl mx-auto grid grid-cols-2 gap-8 text-center py-8 border-t border-slate-700">
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-white">50,000+</div>
                        <div className="text-slate-400 text-sm">Trips Planned</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-white">41,000+</div>
                        <div className="text-slate-400 text-sm">Cities Worldwide</div>
                    </div>
                </div>
            </div>

            {/* Destination Cards */}
            <div className="container mx-auto px-6 pb-16">
                <h2 className="text-xl font-semibold text-center mb-6">Where to go next</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {destinations.map((dest, i) => (
                        <Link 
                            key={i}
                            to={`/planner?destination=${encodeURIComponent(dest.name + ', ' + dest.country)}`}
                            className="group relative rounded-2xl overflow-hidden aspect-[3/4]"
                        >
                            <img 
                                src={dest.image} 
                                alt={dest.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="font-semibold text-white">{dest.name}</h3>
                                <p className="text-slate-300 text-sm">{dest.country}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
