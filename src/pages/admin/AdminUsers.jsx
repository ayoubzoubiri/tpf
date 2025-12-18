import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                setUsers(users.filter(user => user.id !== id));
            } catch (error) {
                console.error("Error deleting user", error);
            }
        }
    };

    const handleCreateClick = () => {
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '', role: 'user' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email, password: '', role: user.role });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const response = await api.put(`/admin/users/${selectedUser.id}`, formData);
                setUsers(users.map(u => u.id === selectedUser.id ? response.data : u));
            } else {
                const response = await api.post('/admin/users', formData);
                setUsers([response.data, ...users]);
            }
            setShowModal(false);
            setFormData({ name: '', email: '', password: '', role: 'user' });
        } catch (error) {
            console.error("Error saving user", error);
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
            <div className="flex justify-end mb-4">
                <button 
                    onClick={handleCreateClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                    <i className="fa-solid fa-plus"></i> Add User
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold">
                            <th className="p-4">User</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-sm font-medium">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-slate-900">{user.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600 text-sm">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                        user.role === 'admin' 
                                            ? 'bg-purple-50 text-purple-600' 
                                            : 'bg-blue-50 text-blue-600'
                                    }`}>
                                        {user.role || 'user'}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-400 text-xs">{new Date(user.created_at).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => handleEditClick(user)}
                                        className="text-slate-400 hover:text-blue-600 p-2 transition"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user.id)}
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit User' : 'Add User'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Password {isEditing && <span className="text-slate-400 font-normal">(leave blank to keep)</span>}
                                </label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    {...(!isEditing ? { required: true } : {})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                <select 
                                    name="role" 
                                    value={formData.role} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
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
                                    {isEditing ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
