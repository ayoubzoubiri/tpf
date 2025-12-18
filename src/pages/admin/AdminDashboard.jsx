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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl"></i>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <i className="fa-solid fa-users text-lg"></i>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Users</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stats.users_count}</h3>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                        <i className="fa-solid fa-map-location-dot text-lg"></i>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Trips</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stats.trips_count}</h3>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                        <i className="fa-solid fa-newspaper text-lg"></i>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm">Blog Posts</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stats.blogs_count}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-white rounded-xl border border-slate-100 p-5">
                    <h3 className="font-bold text-slate-900 mb-4">Recent Users</h3>
                    {stats.recent_users && stats.recent_users.length > 0 ? (
                        <div className="space-y-3">
                            {stats.recent_users.map(user => (
                                <div key={user.id} className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="font-medium text-slate-800 text-sm">{user.name}</div>
                                        <div className="text-slate-400 text-xs">{user.email}</div>
                                    </div>
                                    <div className="text-slate-400 text-xs">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-400 text-sm text-center py-4">No users yet</p>
                    )}
                </div>

                {/* Popular Destinations */}
                <div className="bg-white rounded-xl border border-slate-100 p-5">
                    <h3 className="font-bold text-slate-900 mb-4">Popular Destinations</h3>
                    {stats.popular_destinations && stats.popular_destinations.length > 0 ? (
                        <div className="space-y-3">
                            {stats.popular_destinations.map((dest, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </div>
                                        <span className="font-medium text-slate-800 text-sm">{dest.destination}</span>
                                    </div>
                                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium">
                                        {dest.count} trips
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-400 text-sm text-center py-4">No trip data yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
