import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItineraryView from '../components/ItineraryView';

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await api.get(`/trips/${id}`);
                setTrip(response.data);
            } catch (err) {
                console.error("Error fetching trip details", err);
                setError("Failed to load trip details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                        <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Trip Not Found</h2>
                    <p className="text-gray-500 mb-6">{error || "The trip you are looking for does not exist."}</p>
                    <Link to="/mytrips" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                        Back to My Trips
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
                <div className="mb-8">
                    <Link to="/mytrips" className="text-gray-500 hover:text-blue-600 font-medium flex items-center gap-2 mb-4 transition">
                        <i className="fa-solid fa-arrow-left"></i> Back to My Trips
                    </Link>
                </div>

                <div className="bg-blue-600 p-8 text-white rounded-2xl shadow-xl mb-8 flex justify-between items-start animate-fade-in">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{trip.trip_title}</h1>
                        <p className="text-blue-100 text-lg">{trip.summary}</p>
                        <div className="flex gap-4 mt-4 text-sm font-medium text-blue-200">
                            <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {trip.destination}</span>
                            <span className="flex items-center gap-1"><i className="fa-regular fa-calendar"></i> {trip.duration} Days</span>
                            <span className="flex items-center gap-1"><i className="fa-solid fa-wallet"></i> {trip.budget}</span>
                        </div>
                    </div>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition backdrop-blur-sm flex items-center gap-2">
                        <i className="fa-solid fa-share-nodes"></i> Share
                    </button>
                </div>
                
                <ItineraryView trip={trip} />
            </main>

            <Footer />
        </div>
    );
};

export default TripDetails;
