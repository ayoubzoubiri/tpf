import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Since we don't have a dedicated single blog endpoint yet, 
                // we'll fetch all and filter (for now) or use the admin one if public
                // Ideally, we should create a public GET /blogs/{id} endpoint.
                // For now, let's assume we can fetch it.
                // If the backend doesn't have a public show method, we might need to add it.
                // Let's try to fetch from a new public endpoint we will create.
                const response = await api.get(`/blogs/${id}`);
                setPost(response.data);
            } catch (err) {
                console.error("Error fetching blog post", err);
                setError("Failed to load blog post.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                        <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Post Not Found</h2>
                    <p className="text-gray-500 mb-6">{error || "The blog post you are looking for does not exist."}</p>
                    <Link to="/blog" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                        Back to Blog
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <Link to="/blog" className="text-gray-500 hover:text-blue-600 font-medium flex items-center gap-2 mb-8 transition">
                    <i className="fa-solid fa-arrow-left"></i> Back to Blog
                </Link>

                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="h-64 md:h-96 w-full relative">
                        <img 
                            src={post.image_url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop"} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide mb-3 inline-block">
                                {post.category || 'Travel Tips'}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
                            <div className="flex items-center gap-4 text-sm font-medium text-white/90">
                                <span className="flex items-center gap-2">
                                    <i className="fa-regular fa-user"></i> {post.author || 'Toplago Team'}
                                </span>
                                <span className="flex items-center gap-2">
                                    <i className="fa-regular fa-calendar"></i> {new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 prose prose-lg max-w-none text-gray-600">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
