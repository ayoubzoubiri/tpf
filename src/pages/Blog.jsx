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
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Blog</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">Expert advice, insider guides, and travel inspiration for your next adventure.</p>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                                    <i className="fa-regular fa-newspaper"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
                                <p className="text-gray-500">Check back later for new travel stories!</p>
                            </div>
                        ) : (
                            posts.map(post => (
                                <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer border border-gray-100 flex flex-col h-full">
                                    <div className="h-48 overflow-hidden relative">
                                        <img 
                                            src={post.image_url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop"} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-900 uppercase tracking-wide">
                                            Travel Tips
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                            <i className="fa-regular fa-calendar"></i>
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition line-clamp-2">{post.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">{post.content}</p>
                                        
                                        <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-xs font-medium text-gray-900">Toplago Team</span>
                                            </div>
                                            <Link to={`/blog/${post.id}`} className="text-blue-600 text-sm font-semibold hover:underline">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
