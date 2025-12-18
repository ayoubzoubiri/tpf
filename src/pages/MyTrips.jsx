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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-20">
                <div className="container mx-auto px-6 py-8 max-w-4xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">My Trips</h1>
                            <p className="text-slate-500 text-sm">
                                {trips.length} {trips.length === 1 ? 'trip' : 'trips'} saved
                            </p>
                        </div>
                        <Link 
                            to="/planner" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                        >
                            <i className="fa-solid fa-plus"></i>
                            New Trip
                        </Link>
                    </div>

                    {loading ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl mb-4"></i>
                            <p className="text-slate-500">Loading trips...</p>
                        </div>
                    ) : trips.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fa-solid fa-map text-blue-600 text-xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No trips yet</h3>
                            <p className="text-slate-500 text-sm mb-6">Create your first AI-powered itinerary</p>
                            <Link 
                                to="/planner" 
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                            >
                                <i className="fa-solid fa-wand-magic-sparkles"></i>
                                Create Trip
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {trips.map((trip) => (
                                <Link 
                                    key={trip.id}
                                    to={`/trips/${trip.id}`}
                                    className="block bg-white rounded-xl p-4 border border-slate-100 hover:border-blue-200 hover:shadow-md transition group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition">
                                            <i className="fa-solid fa-location-dot text-slate-500 group-hover:text-blue-600 transition"></i>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-slate-900">{trip.destination}</h3>
                                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                                    {trip.duration}d
                                                </span>
                                            </div>
                                            <p className="text-slate-500 text-sm truncate">{trip.trip_title}</p>
                                        </div>
                                        <div className="flex items-center gap-4 flex-shrink-0">
                                            <span className="text-xs text-slate-400">{formatDate(trip.created_at)}</span>
                                            <i className="fa-solid fa-chevron-right text-slate-300 group-hover:text-blue-600 transition"></i>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default MyTrips;
