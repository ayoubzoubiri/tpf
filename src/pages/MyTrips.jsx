import React from 'react';
import { useTrip } from '../context/TripContext';
import MyTripsHeader from '../components/trips/MyTripsHeader';
import EmptyTripsState from '../components/trips/EmptyTripsState';
import TripCard from '../components/trips/TripCard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MyTrips = () => {
    const { myTrips, myTripsLoading } = useTrip();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-20">
                <div className="container mx-auto px-6 py-8 max-w-4xl">
                    <MyTripsHeader tripCount={myTrips.length} />

                    {myTripsLoading ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl mb-4"></i>
                            <p className="text-slate-500">Loading trips...</p>
                        </div>
                    ) : myTrips.length === 0 ? (
                        <EmptyTripsState />
                    ) : (
                        <div className="space-y-3">
                            {myTrips.map((trip) => (
                                <TripCard key={trip.id} trip={trip} formatDate={formatDate} />
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
