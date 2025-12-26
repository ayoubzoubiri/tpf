import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="Toplago" className="w-8 h-8 object-contain" />
                            <span className="text-lg font-semibold text-slate-900">Toplago</span>
                        </Link>
                        <p className="text-slate-500 text-sm mb-4">
                            AI-powered travel planning.<br />Your trip in minutes, not weeks.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-8 h-8 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center text-slate-500 transition">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center text-slate-500 transition">
                                <i className="fa-brands fa-tiktok"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center text-slate-500 transition">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-3 text-sm">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-slate-500 hover:text-blue-600 transition">About</a></li>
                            <li><Link to="/blog" className="text-slate-500 hover:text-blue-600 transition">Blog</Link></li>
                            <li><a href="#" className="text-slate-500 hover:text-blue-600 transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-3 text-sm">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/planner" className="text-slate-500 hover:text-blue-600 transition">AI Planner</Link></li>
                            <li><a href="#" className="text-slate-500 hover:text-blue-600 transition">Itineraries</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-blue-600 transition">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-slate-900 mb-3 text-sm">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-slate-500 hover:text-blue-600 transition">Privacy</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-blue-600 transition">Terms</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        Made with 💙 • © 2025 Toplago
                    </p>
                    <p className="text-slate-400 text-xs">
                        Powered by AI
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
