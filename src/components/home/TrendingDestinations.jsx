import React from 'react';

const TrendingDestinations = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-gray-900">Trending Destinations</h2>
                        <p className="text-gray-600">Explore the most popular places travelers are visiting right now.</p>
                    </div>
                    <a href="#" className="text-blue-600 font-medium hover:underline hidden md:block">View All &rarr;</a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl mb-4 h-64">
                            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop" alt="Bali" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">Bali, Indonesia</h3>
                            <span className="flex items-center gap-1 text-sm font-bold"><i className="fa-solid fa-star text-yellow-400"></i> 4.8</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">Tropical paradise with ancient temples, lush rice terraces, and stunning beaches perfect for relaxation.</p>
                        <div className="flex justify-between items-center text-sm mb-4">
                            <span className="text-gray-400"><i className="fa-solid fa-fire text-orange-500 mr-1"></i> 12.5k travelers</span>
                            <span className="text-blue-600 font-semibold">From $999</span>
                        </div>
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition text-sm">
                            Earn Miles
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl mb-4 h-64">
                            <img src="https://images.unsplash.com/photo-1613395877344-13d4c79e4284?q=80&w=1000&auto=format&fit=crop" alt="Santorini" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">Santorini, Greece</h3>
                            <span className="flex items-center gap-1 text-sm font-bold"><i className="fa-solid fa-star text-yellow-400"></i> 4.9</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">Iconic white-washed buildings, breathtaking sunsets, and crystal-clear waters create an unforgettable escape.</p>
                        <div className="flex justify-between items-center text-sm mb-4">
                            <span className="text-gray-400"><i className="fa-solid fa-fire text-orange-500 mr-1"></i> 8.4k travelers</span>
                            <span className="text-blue-600 font-semibold">From $1,299</span>
                        </div>
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition text-sm">
                            Earn Miles
                        </button>
                    </div>

                    {/* Card 3 */}
                    <div className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl mb-4 h-64">
                            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop" alt="Tokyo" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">Tokyo, Japan</h3>
                            <span className="flex items-center gap-1 text-sm font-bold"><i className="fa-solid fa-star text-yellow-400"></i> 4.9</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">A mesmerizing blend of ancient tradition and futuristic innovation, offering world-class cuisine.</p>
                        <div className="flex justify-between items-center text-sm mb-4">
                            <span className="text-gray-400"><i className="fa-solid fa-fire text-orange-500 mr-1"></i> 15.2k travelers</span>
                            <span className="text-blue-600 font-semibold">From $1,599</span>
                        </div>
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg transition text-sm">
                            Earn Miles
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingDestinations;
