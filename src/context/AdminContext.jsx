import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const { user } = useAuth();
    
    // --- State ---
    const [stats, setStats] = useState({ users_count: 0, trips_count: 0, blogs_count: 0 });
    const [users, setUsers] = useState([]);
    const [trips, setTrips] = useState([]);
    const [blogs, setBlogs] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Actions: Dashboard Stats ---
    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data);
        } catch (err) {
            console.error('Admin stats error:', err);
        }
    };

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, usersRes, tripsRes] = await Promise.all([
                api.get('/admin/stats'),
                api.get('/admin/users/latest'), // Assuming we have endpoints for dashboard widgets
                api.get('/admin/destinations/popular')
            ]);
            
            // Note: Adjusting based on actual widget needs. 
            // For now, let's keep it simple and load full lists if widgets need them or separate endpoints if available.
            // The existing Dashboard used specific components that probably fetched their own data or were passed data.
            // Simplified: Fetch Stats
            setStats(statsRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // --- Actions: Users Management ---
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete user');
        }
    };

    const updateUser = async (id, data) => {
        try {
            const response = await api.put(`/admin/users/${id}`, data);
            setUsers(prev => prev.map(u => u.id === id ? response.data : u));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const createUser = async (data) => {
        try {
            const response = await api.post('/admin/users', data);
            setUsers(prev => [response.data, ...prev]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    // --- Actions: Trips Management ---
    const fetchTrips = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/trips');
            setTrips(response.data);
        } catch (err) {
            setError('Failed to fetch trips');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteTrip = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/admin/trips/${id}`);
            setTrips(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete trip');
        }
    };

     const updateTrip = async (id, data) => {
        try {
            const response = await api.put(`/admin/trips/${id}`, data);
            setTrips(prev => prev.map(t => t.id === id ? response.data : t));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    // --- Actions: Blogs Management ---
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/blogs');
            setBlogs(response.data);
        } catch (err) {
            setError('Failed to fetch blogs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/admin/blogs/${id}`);
            setBlogs(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            console.error(err);
            alert('Failed to delete blog');
        }
    };

    const createBlog = async (data) => {
         try {
            const response = await api.post('/admin/blogs', data);
            setBlogs(prev => [response.data, ...prev]);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const updateBlog = async (id, data) => {
        try {
            const response = await api.put(`/admin/blogs/${id}`, data);
            setBlogs(prev => prev.map(b => b.id === id ? response.data : b));
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const value = {
        stats,
        users,
        trips,
        blogs,
        loading,
        error,
        fetchStats,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        fetchTrips,
        updateTrip,
        deleteTrip,
        fetchBlogs,
        createBlog,
        updateBlog,
        deleteBlog
    };

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export default AdminContext;
