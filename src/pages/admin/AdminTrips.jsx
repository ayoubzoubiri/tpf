import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const AdminTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
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
                alert("Failed to delete trip");
            }
        }
    };

    const handleEditClick = (trip) => {
        setSelectedTrip(trip);
        setFormData({ trip_title: trip.trip_title, destination: trip.destination, duration: trip.duration });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/admin/trips/${selectedTrip.id}`, formData);
            setTrips(trips.map(t => t.id === selectedTrip.id ? { ...t, ...response.data } : t));
            setShowEditModal(false);
            setSelectedTrip(null);
        } catch (error) {
            console.error("Error updating trip", error);
            alert("Failed to update trip");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="p-8 text-center">Loading trips...</div>;

    return (
        <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                            <th className="p-4">ID</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Destination</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Duration</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map(trip => (
                            <tr key={trip.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                <td className="p-4 text-gray-500">#{trip.id}</td>
                                <td className="p-4 font-medium text-gray-900">{trip.trip_title}</td>
                                <td className="p-4 text-gray-600">{trip.destination}</td>
                                <td className="p-4 text-gray-600">
                                    {trip.user && trip.user.name ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                                                {trip.user.name.charAt(0)}
                                            </div>
                                            {trip.user.name}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 italic">Guest</span>
                                    )}
                                </td>
                                <td className="p-4 text-gray-500">{trip.duration} Days</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <Link 
                                        to={`/trips/${trip.id}`}
                                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                                        title="View Trip"
                                        target="_blank"
                                    >
                                        <i className="fa-solid fa-eye"></i>
                                    </Link>
                                    <button 
                                        onClick={() => handleEditClick(trip)}
                                        className="text-green-500 hover:text-green-700 hover:bg-green-50 p-2 rounded-lg transition"
                                        title="Edit Trip"
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(trip.id)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                                        title="Delete Trip"
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
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Edit Trip</h2>
                            <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                                <input 
                                    type="text" 
                                    name="trip_title" 
                                    value={formData.trip_title} 
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                <input 
                                    type="text" 
                                    name="destination" 
                                    value={formData.destination} 
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                                <input 
                                    type="number" 
                                    name="duration" 
                                    value={formData.duration} 
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    min="1"
                                    required 
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowEditModal(false)}
                                    className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition"
                                >
                                    Update Trip
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
