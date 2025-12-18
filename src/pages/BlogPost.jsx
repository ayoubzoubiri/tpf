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
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-16">
                    <div className="text-center">
                        <i className="fa-solid fa-spinner animate-spin text-blue-600 text-3xl mb-4"></i>
                        <p className="text-slate-500">Loading post...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center p-6 pt-16">
                    <div className="bg-white rounded-2xl p-12 text-center max-w-md">
                        <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Post Not Found</h2>
                        <p className="text-slate-500 mb-6">{error || "The blog post does not exist."}</p>
                        <Link to="/blog" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition">
                            <i className="fa-solid fa-arrow-left"></i> Back to Blog
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Hero Image */}
            <div className="relative h-72 md:h-96 bg-slate-900 mt-16">
                <img 
                    src={post.image_url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide mb-4">
                            {post.category || 'Travel Tips'}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-4 text-slate-300 text-sm">
                            <span className="flex items-center gap-2">
                                <i className="fa-regular fa-user"></i> {post.author || 'Toplago Team'}
                            </span>
                            <span className="flex items-center gap-2">
                                <i className="fa-regular fa-calendar"></i> {new Date(post.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow">
                <div className="container mx-auto px-6 py-12 max-w-3xl">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition">
                        <i className="fa-solid fa-arrow-left text-sm"></i> Back to Blog
                    </Link>

                    <article className="bg-white rounded-2xl p-8 md:p-12 border border-slate-100">
                        <div className="prose prose-slate prose-lg max-w-none">
                            {post.content.split('\n').map((paragraph, index) => (
                                <p key={index} className="text-slate-600 leading-relaxed mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </article>

                    {/* Share */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className="text-slate-500 text-sm">Share:</span>
                        <button className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-500 transition">
                            <i className="fa-brands fa-twitter"></i>
                        </button>
                        <button className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-500 transition">
                            <i className="fa-brands fa-facebook-f"></i>
                        </button>
                        <button className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl flex items-center justify-center text-slate-500 transition">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
