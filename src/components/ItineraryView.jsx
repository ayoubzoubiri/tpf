import React, { useState } from 'react';

const ItineraryView = ({ trip }) => {
    const [activeDay, setActiveDay] = useState(1);
    const days = trip.day_plans || trip.days || [];

    // Helper to get activities for the current day
    const currentDayActivities = days.find(d => (d.day_number || d.day) === activeDay)?.activities || [];

    // Mock data for recommendations (Right column)
    const recommendations = [
        {
            id: 1,
            title: "Skip-the-Line Louvre Museum Guided Tour",
            image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?q=80&w=1000&auto=format&fit=crop",
            rating: 4.9,
            reviews: 12847,
            duration: "3 hours",
            price: 89,
            tags: ["Small group", "English, French"]
        },
        {
            id: 2,
            title: "Eiffel Tower Summit with Priority Access",
            image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=1000&auto=format&fit=crop",
            rating: 4.7,
            reviews: 28394,
            duration: "1.5 hours",
            price: 72,
            tags: ["Skip-the-line", "Accessible"]
        },
        {
            id: 3,
            title: "Seine River Dinner Cruise with Live Music",
            image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=1000&auto=format&fit=crop",
            rating: 4.8,
            reviews: 9156,
            duration: "2.5 hours",
            price: 145,
            tags: ["Dinner included", "Live music"]
        }
    ];

    return (
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column: Itinerary */}
            <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Day-by-Day Itinerary</h2>
                        <button className="text-blue-600 hover:text-blue-700">
                            <i className="fa-solid fa-pen"></i>
                        </button>
                    </div>

                    {/* Day Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                        {days.map((day) => {
                            const dayNum = day.day_number || day.day;
                            return (
                                <button
                                    key={dayNum}
                                    onClick={() => setActiveDay(dayNum)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                                        activeDay === dayNum
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Day {dayNum}
                                </button>
                            );
                        })}
                    </div>

                    {/* Timeline */}
                    <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                        {currentDayActivities.map((activity, index) => (
                            <div key={index} className="relative pl-6">
                                {/* Timeline Dot/Icon */}
                                <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow-sm flex items-center justify-center text-white text-sm z-10">
                                    <i className={`fa-solid ${
                                        (activity.time_of_day || activity.time || '').toLowerCase().includes('morning') ? 'fa-sun' :
                                        (activity.time_of_day || activity.time || '').toLowerCase().includes('evening') ? 'fa-moon' :
                                        (activity.time_of_day || activity.time || '').toLowerCase().includes('lunch') ? 'fa-utensils' :
                                        'fa-location-dot'
                                    }`}></i>
                                </div>

                                {/* Content */}
                                <div>
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 block">
                                        {activity.time_of_day || activity.time}
                                    </span>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">{activity.description}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{activity.location}</p>
                                    {/* Optional: Add tags or more details if available */}
                                </div>
                            </div>
                        ))}
                        
                        {/* Add Activity Button Placeholder */}
                        <div className="relative pl-6 pt-4">
                            <div className="absolute -left-[11px] top-6 w-5 h-5 rounded-full bg-gray-200 border-2 border-white"></div>
                            <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium hover:border-blue-300 hover:text-blue-500 transition">
                                Add Activity
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Recommendations */}
            <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recommended Activities</h2>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {['Price Range', 'Duration', 'Popularity', 'Category'].map(filter => (
                                <button key={filter} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                                    {filter} <i className="fa-solid fa-chevron-down ml-1 text-[10px]"></i>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {recommendations.map(item => (
                            <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition bg-white group">
                                <div className="w-full md:w-48 h-32 md:h-auto shrink-0 rounded-lg overflow-hidden relative">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-purple-600 uppercase">
                                        Viator Partner
                                    </div>
                                </div>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">Explore the world's largest art museum with an expert guide. See the Mona Lisa, Venus de Milo, and other masterpieces.</p>
                                        <div className="flex items-center gap-2 text-xs mb-3">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className={`fa-solid fa-star ${i < Math.floor(item.rating) ? '' : 'text-gray-200'}`}></i>
                                                ))}
                                            </div>
                                            <span className="font-bold text-gray-900">{item.rating}</span>
                                            <span className="text-gray-400">({item.reviews.toLocaleString()} reviews)</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                                                    {tag === 'Skip-the-line' && <i className="fa-solid fa-person-running"></i>}
                                                    {tag}
                                                </span>
                                            ))}
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                                                <i className="fa-regular fa-clock"></i> {item.duration}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                                        <div>
                                            <span className="text-xs text-gray-400">From</span>
                                            <span className="text-lg font-bold text-gray-900 ml-1">${item.price}</span>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                                            <i className="fa-solid fa-plus"></i> Add to Itinerary
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryView;
