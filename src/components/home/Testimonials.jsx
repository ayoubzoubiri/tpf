import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Sarah, 28',
            text: 'Planned my entire Japan trip in 5 minutes. The AI knew exactly what I wanted!',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
        },
        {
            name: 'Marcus, 35',
            text: 'Best travel app I\'ve ever used. Saved me hours of research.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80'
        },
        {
            name: 'Emma, 42',
            text: 'The family trip suggestions were perfect. Kids had a blast!',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
                    What travelers say about me
                </h2>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-slate-50 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <img 
                                    src={t.image} 
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-medium text-slate-900">{t.name}</div>
                                    <div className="flex text-yellow-400 text-xs">
                                        {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">"{t.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
