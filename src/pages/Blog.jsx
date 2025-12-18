import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/blog');
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching blog posts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-20">
                {/* Header */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Travel Blog</h1>
                        <p className="text-slate-300 max-w-xl mx-auto">
                            Expert advice, insider guides, and travel inspiration for your next adventure.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 py-12 max-w-6xl">
                    {loading ? (
                        <div className="text-center py-16">
                            <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl mb-4"></i>
                            <p className="text-slate-500">Loading posts...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <i className="fa-regular fa-newspaper text-blue-600 text-xl"></i>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No posts yet</h3>
                            <p className="text-slate-500">Check back later for travel stories!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map(post => (
                                <Link 
                                    key={post.id} 
                                    to={`/blog/${post.id}`}
                                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition group"
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img 
                                            src={post.image_url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium">Travel Tips</span>
                                            <span>•</span>
                                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-4">{post.content}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden">
                                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-xs font-medium text-slate-600">Toplago Team</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
