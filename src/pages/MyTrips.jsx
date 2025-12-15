import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await api.get('/trips');
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
                        <p className="text-gray-500">View and manage your saved itineraries.</p>
                    </div>
                    <Link to="/planner" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-sm hover:shadow-md flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Plan New Trip
                    </Link>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                                    <i className="fa-solid fa-plane-slash"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No trips saved yet</h3>
                                <p className="text-gray-500 mb-8">Start planning your next adventure today!</p>
                                <Link to="/planner" className="text-blue-600 font-semibold hover:underline">Start Planning &rarr;</Link>
                            </div>
                        ) : (
                            trips.map(trip => (
                                <div key={trip.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col h-full">
                                    <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative p-6 flex flex-col justify-end text-white">
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                                            {trip.duration} Days
                                        </div>
                                        <h3 className="text-2xl font-bold mb-1">{trip.destination}</h3>
                                        <p className="text-blue-100 text-sm opacity-90">{trip.trip_title}</p>
                                    </div>
                                    <div className="p-6 flex-grow">
                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{trip.summary}</p>
                                        
                                        <div className="space-y-3">
                                            {trip.day_plans && trip.day_plans.slice(0, 3).map(day => (
                                                <div key={day.id} className="flex items-start gap-3 text-sm">
                                                    <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                                                        {day.day_number}
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{day.theme}</span>
                                                </div>
                                            ))}
                                            {trip.day_plans && trip.day_plans.length > 3 && (
                                                <div className="text-xs text-gray-400 pl-9">
                                                    + {trip.day_plans.length - 3} more days
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0 mt-auto">
                                        <Link to={`/trips/${trip.id}`} className="block w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium py-3 rounded-xl transition">
                                            View Full Itinerary
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyTrips;
