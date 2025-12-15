import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users_count: 0, trips_count: 0, blogs_count: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading stats...</div>;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl">
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Users</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.users_count}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl">
                        <i className="fa-solid fa-map-location-dot"></i>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Trips Generated</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.trips_count}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl">
                        <i className="fa-solid fa-newspaper"></i>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Blog Posts</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.blogs_count}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Users */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Users</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs uppercase text-gray-500 border-b border-gray-100">
                                    <th className="pb-3">Name</th>
                                    <th className="pb-3">Email</th>
                                    <th className="pb-3">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recent_users && stats.recent_users.map(user => (
                                    <tr key={user.id} className="border-b border-gray-50 last:border-0">
                                        <td className="py-3 font-medium text-gray-800">{user.name}</td>
                                        <td className="py-3 text-gray-500 text-sm">{user.email}</td>
                                        <td className="py-3 text-gray-400 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popular Destinations */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Destinations</h3>
                    <div className="space-y-4">
                        {stats.popular_destinations && stats.popular_destinations.map((dest, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <span className="font-medium text-gray-800">{dest.destination}</span>
                                </div>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                                    {dest.count} trips
                                </span>
                            </div>
                        ))}
                        {(!stats.popular_destinations || stats.popular_destinations.length === 0) && (
                            <p className="text-gray-500 text-center py-4">No trip data available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
