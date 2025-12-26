import React, { useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import StatCard from '../../components/admin/StatCard';
import RecentUsers from '../../components/admin/RecentUsers';
import PopularDestinations from '../../components/admin/PopularDestinations';

const AdminDashboard = () => {
    const { stats, fetchStats } = useAdmin();

    useEffect(() => {
        fetchStats();
    }, []);

    // Helper for loading state if needed, but context handles it. 
    // If stats is empty initially, we can show specific skeletons, or just render 0.

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard 
                    label="Users" 
                    value={stats.users_count || 0} 
                    icon="fa-solid fa-users" 
                    bgClass="bg-blue-50" 
                    colorClass="text-blue-600" 
                />
                <StatCard 
                    label="Trips" 
                    value={stats.trips_count || 0} 
                    icon="fa-solid fa-map-location-dot" 
                    bgClass="bg-green-50" 
                    colorClass="text-green-600" 
                />
                <StatCard 
                    label="Blog Posts" 
                    value={stats.blogs_count || 0} 
                    icon="fa-solid fa-newspaper" 
                    bgClass="bg-purple-50" 
                    colorClass="text-purple-600" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentUsers users={stats.recent_users || []} />
                <PopularDestinations destinations={stats.popular_destinations || []} />
            </div>
        </div>
    );
};

export default AdminDashboard;
