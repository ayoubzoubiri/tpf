import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Default loading true for initial fetch
    const [error, setError] = useState(null);
    const [currentPost, setCurrentPost] = useState(null);

    // --- Action: Fetch All Posts ---
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/blogs'); // Assuming public endpoint
            setPosts(response.data);
            setError(null);
        } catch (err) {
            console.error('Fetch blog posts error:', err);
            setError('Failed to load blog posts.');
        } finally {
            setLoading(false);
        }
    };

    // --- Action: Fetch Single Post ---
    const fetchPostById = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/blogs/${id}`);
            setCurrentPost(response.data);
            return response.data;
        } catch (err) {
            console.error('Fetch blog post error:', err);
            setError('Failed to load the blog post.');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchPosts();
    }, []);

    const value = {
        posts,
        currentPost,
        loading,
        error,
        fetchPosts,
        fetchPostById
    };

    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};

export default BlogContext;
