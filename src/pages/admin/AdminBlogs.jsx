import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image_url: '',
        category: 'Travel Tips',
        author: 'Admin'
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await api.get('/admin/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this blog post?')) {
            try {
                await api.delete(`/admin/blogs/${id}`);
                setBlogs(blogs.filter(blog => blog.id !== id));
            } catch (error) {
                console.error("Error deleting blog", error);
            }
        }
    };

    const handleCreateClick = () => {
        setSelectedBlog(null);
        setFormData({ title: '', excerpt: '', content: '', image_url: '', category: 'Travel Tips', author: 'Admin' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditClick = (blog) => {
        setSelectedBlog(blog);
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt || '',
            content: blog.content,
            image_url: blog.image_url || '',
            category: blog.category,
            author: blog.author
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const response = await api.put(`/admin/blogs/${selectedBlog.id}`, formData);
                setBlogs(blogs.map(b => b.id === selectedBlog.id ? response.data : b));
            } else {
                const response = await api.post('/admin/blogs', formData);
                setBlogs([response.data, ...blogs]);
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error saving blog", error);
        }
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
                    <i className="fa-solid fa-plus"></i> New Post
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold">
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Author</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                <td className="p-4">
                                    <div className="font-medium text-slate-900 text-sm">{blog.title}</div>
                                    <div className="text-slate-400 text-xs">#{blog.id}</div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-medium">
                                        {blog.category}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-600 text-sm">{blog.author}</td>
                                <td className="p-4 text-slate-400 text-xs">{new Date(blog.created_at).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <button 
                                        onClick={() => handleEditClick(blog)}
                                        className="text-slate-400 hover:text-blue-600 p-2 transition"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(blog.id)}
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
                    <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-900">{isEditing ? 'Edit Post' : 'New Post'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    required 
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select 
                                        name="category" 
                                        value={formData.category} 
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    >
                                        <option>Travel Tips</option>
                                        <option>Destinations</option>
                                        <option>Food & Drink</option>
                                        <option>Adventure</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
                                    <input 
                                        type="text" 
                                        name="author" 
                                        value={formData.author} 
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                        required 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                                <input 
                                    type="url" 
                                    name="image_url" 
                                    value={formData.image_url} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
                                <textarea 
                                    name="excerpt" 
                                    value={formData.excerpt} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm h-20 resize-none"
                                    placeholder="Short summary..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                                <textarea 
                                    name="content" 
                                    value={formData.content} 
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm h-40 resize-none"
                                    required
                                ></textarea>
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

export default AdminBlogs;
