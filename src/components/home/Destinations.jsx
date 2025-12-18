import React from 'react';
import { Link } from 'react-router-dom';

const Destinations = () => {
    const trips = [
        {
            title: '7 Days in Japan: Tokyo to Kyoto',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
            days: 7
        },
        {
            title: 'Romantic Week in Italy',
            image: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=600&q=80',
            days: 7
        },
        {
            title: 'Adventure in Bali',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
            days: 5
        },
        {
            title: 'NYC City Break',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80',
            days: 4
        },
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Popular Itineraries</h2>
                    <Link to="/planner" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        View all <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Link>
                </div>

                {/* Trip Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {trips.map((trip, i) => (
                        <Link 
                            key={i}
                            to="/planner"
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img 
                                    src={trip.image} 
                                    alt={trip.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">{trip.title}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 text-xs">{trip.days} days</span>
                                    <span className="text-blue-600 text-xs font-medium">Start planning →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
