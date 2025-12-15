import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white';
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                        <i className="fa-solid fa-paper-plane text-blue-500"></i>
                        Toplago<span className="text-blue-500">.</span>
                    </Link>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">Admin Panel</p>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/admin/dashboard')}`}>
                        <i className="fa-solid fa-chart-line w-5"></i> Dashboard
                    </Link>
                    <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/admin/users')}`}>
                        <i className="fa-solid fa-users w-5"></i> Users
                    </Link>
                    <Link to="/admin/trips" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/admin/trips')}`}>
                        <i className="fa-solid fa-map-location-dot w-5"></i> Trips
                    </Link>
                    <Link to="/admin/blogs" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive('/admin/blogs')}`}>
                        <i className="fa-solid fa-newspaper w-5"></i> Blogs
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition">
                        <i className="fa-solid fa-right-from-bracket w-5"></i> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow overflow-auto">
                <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        {location.pathname.includes('dashboard') ? 'Overview' : 
                         location.pathname.includes('users') ? 'User Management' :
                         location.pathname.includes('trips') ? 'Trip Management' :
                         location.pathname.includes('blogs') ? 'Blog Management' : 'Admin'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            A
                        </div>
                    </div>
                </header>
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
