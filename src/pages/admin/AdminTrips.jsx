import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const AdminTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [formData, setFormData] = useState({ trip_title: '', destination: '', duration: 1 });

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await api.get('/admin/trips');
            setTrips(response.data);
        } catch (error) {
            console.error("Error fetching trips", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            try {
                await api.delete(`/admin/trips/${id}`);
                setTrips(trips.filter(trip => trip.id !== id));
            } catch (error) {
                console.error("Error deleting trip", error);
            }
        }
    };

    const handleEditClick = (trip) => {
        setSelectedTrip(trip);
        setFormData({ trip_title: trip.trip_title, destination: trip.destination, duration: trip.duration });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/admin/trips/${selectedTrip.id}`, formData);
            setTrips(trips.map(t => t.id === selectedTrip.id ? { ...t, ...response.data } : t));
            setShowModal(false);
        } catch (error) {
            console.error("Error updating trip", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl"></i>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold">
                            <th className="p-4">Trip</th>
                            <th className="p-4">Destination</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Duration</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map(trip => (
                            <tr key={trip.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                <td className="p-4">
                                    <div className="font-medium text-slate-900 text-sm">{trip.trip_title}</div>
                                    <div className="text-slate-400 text-xs">#{trip.id}</div>
                                </td>
                                <td className="p-4 text-slate-600 text-sm">{trip.destination}</td>
                                <td className="p-4">
                                    {trip.user?.name ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                                {trip.user.name.charAt(0)}
                                            </div>
                                            <span className="text-slate-600 text-sm">{trip.user.name}</span>
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 text-sm">Guest</span>
                                    )}
                                </td>
                                <td className="p-4 text-slate-600 text-sm">{trip.duration}d</td>
                                <td className="p-4 text-right">
                                    <Link 
                                        to={`/trips/${trip.id}`}
                                        target="_blank"
                                        className="text-slate-400 hover:text-blue-600 p-2 inline-block transition"
                                    >
                                        <i className="fa-solid fa-eye"></i>
                                    </Link>
                                    <button 
                                        onClick={() => handleEditClick(trip)}
                                        className="text-slate-400 hover:text-green-600 p-2 transition"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(trip.id)}
                                        className="text-slate-400 hover:text-red-600 p-2 transition"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900">Edit Trip</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input 
                                    type="text" 
                                    name="trip_title" 
                                    value={formData.trip_title} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                                <input 
                                    type="text" 
                                    name="destination" 
                                    value={formData.destination} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Days)</label>
                                <input 
                                    type="number" 
                                    name="duration" 
                                    value={formData.duration} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    min="1"
                                    required 
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 rounded-xl text-slate-600 hover:bg-slate-100 font-medium transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium transition"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTrips;
