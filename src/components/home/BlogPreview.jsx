import React from 'react';
import { Link } from 'react-router-dom';

const BlogPreview = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-gray-900">Latest Travel Tips</h2>
                        <p className="text-gray-600">Expert advice and insider guides to make your trips unforgettable.</p>
                    </div>
                    <Link to="/blog" className="text-blue-600 font-medium hover:underline hidden md:block">Read All Posts &rarr;</Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Blog Card 1 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer">
                        <div className="h-48 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop" alt="Packing" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-3 uppercase tracking-wide">
                                <span className="bg-blue-100 px-2 py-1 rounded-md">Travel Tips</span>
                                <span className="text-gray-400 font-normal normal-case">5 min read</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition">10 Essential Packing Tips for Your Next Adventure</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">Master the art of efficient packing with these expert tips that will save space, time, and stress on your travels.</p>
                            <div className="flex items-center gap-3">
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Author" className="w-8 h-8 rounded-full" />
                                <div className="text-xs">
                                    <div className="font-bold text-gray-900">Sarah Johnson</div>
                                    <div className="text-gray-400">Oct 15, 2025</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog Card 2 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer">
                        <div className="h-48 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop" alt="Budget" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 mb-3 uppercase tracking-wide">
                                <span className="bg-purple-100 px-2 py-1 rounded-md">Budget Travel</span>
                                <span className="text-gray-400 font-normal normal-case">7 min read</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition">How to Travel Europe on a Budget in 2025</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">Discover money-saving strategies and hidden gems that let you explore Europe without breaking the bank.</p>
                            <div className="flex items-center gap-3">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Author" className="w-8 h-8 rounded-full" />
                                <div className="text-xs">
                                    <div className="font-bold text-gray-900">Michael Chen</div>
                                    <div className="text-gray-400">Oct 12, 2025</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog Card 3 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer">
                        <div className="h-48 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop" alt="Solo Travel" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 text-xs font-bold text-green-600 mb-3 uppercase tracking-wide">
                                <span className="bg-green-100 px-2 py-1 rounded-md">Solo Travel</span>
                                <span className="text-gray-400 font-normal normal-case">6 min read</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition">The Ultimate Guide to Safe Solo Travel</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">Everything you need to know about traveling alone confidently, from safety tips to meeting fellow travelers.</p>
                            <div className="flex items-center gap-3">
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Author" className="w-8 h-8 rounded-full" />
                                <div className="text-xs">
                                    <div className="font-bold text-gray-900">Elena Rodriguez</div>
                                    <div className="text-gray-400">Oct 10, 2025</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
