import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import BlogsTable from '../../components/admin/blogs/BlogsTable';
import BlogModal from '../../components/admin/blogs/BlogModal';

const AdminBlogs = () => {
    const { blogs, loading, fetchBlogs, deleteBlog, createBlog, updateBlog } = useAdmin();
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
        const success = isEditing 
            ? await updateBlog(selectedBlog.id, formData)
            : await createBlog(formData);

        if (success) {
            setShowModal(false);
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

            <BlogsTable 
                blogs={blogs} 
                onEdit={handleEditClick} 
                onDelete={deleteBlog} 
            />

            <BlogModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
                isEditing={isEditing}
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
        </div>
    );
};

export default AdminBlogs;
