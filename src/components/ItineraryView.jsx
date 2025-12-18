import React, { useState } from 'react';
import MapComponent from './MapComponent';

const ItineraryView = ({ trip }) => {
    const [activeDay, setActiveDay] = useState(1);
    const days = trip.day_plans || trip.days || [];
    const currentDayActivities = days.find(d => (d.day_number || d.day) === activeDay)?.activities || [];

    const getTimeIcon = (time) => {
        const t = (time || '').toLowerCase();
        if (t.includes('morning')) return { icon: 'fa-sun', bg: 'bg-amber-500' };
        if (t.includes('afternoon')) return { icon: 'fa-cloud-sun', bg: 'bg-orange-500' };
        if (t.includes('evening') || t.includes('night')) return { icon: 'fa-moon', bg: 'bg-indigo-500' };
        if (t.includes('lunch')) return { icon: 'fa-utensils', bg: 'bg-red-500' };
        return { icon: 'fa-location-dot', bg: 'bg-blue-500' };
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column: Map */}
            <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden sticky top-24">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <span className="text-xs text-slate-400 uppercase tracking-wide">Route</span>
                            <h3 className="font-semibold text-slate-900">Day {activeDay}</h3>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 transition">
                                <i className="fa-solid fa-minus text-xs"></i>
                            </button>
                            <button className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 transition">
                                <i className="fa-solid fa-plus text-xs"></i>
                            </button>
                        </div>
                    </div>
                    <div className="h-[400px] lg:h-[500px]">
                        <MapComponent activities={currentDayActivities} day={activeDay} destination={trip.destination} />
                    </div>
                </div>
            </div>

            {/* Right Column: Itinerary */}
            <div className="order-1 lg:order-2">
                {/* Day Selector */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {days.map((day) => {
                        const dayNum = day.day_number || day.day;
                        return (
                            <button
                                key={dayNum}
                                onClick={() => setActiveDay(dayNum)}
                                className={`flex-shrink-0 px-5 py-3 rounded-xl font-medium transition ${
                                    activeDay === dayNum
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                                }`}
                            >
                                <span className="text-xs opacity-70">Day</span>
                                <span className="block text-lg">{dayNum}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Activities */}
                <div className="space-y-4">
                    {currentDayActivities.map((activity, index) => {
                        const timeInfo = getTimeIcon(activity.time_of_day || activity.time);
                        return (
                            <div 
                                key={index} 
                                className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-blue-100 transition-all group"
                            >
                                <div className="flex gap-4">
                                    {/* Time Icon */}
                                    <div className={`w-12 h-12 ${timeInfo.bg} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                                        <i className={`fa-solid ${timeInfo.icon}`}></i>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                                {activity.time_of_day || activity.time}
                                            </span>
                                            <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition">
                                                <i className="fa-solid fa-ellipsis"></i>
                                            </button>
                                        </div>
                                        
                                        <h3 className="font-semibold text-slate-900 mb-2 leading-snug">
                                            {activity.description}
                                        </h3>
                                        
                                        {activity.location && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <i className="fa-solid fa-location-dot text-slate-400"></i>
                                                <span className="truncate">{activity.location}</span>
                                            </div>
                                        )}

                                        {/* Action buttons */}
                                        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
                                            <button className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition">
                                                <i className="fa-solid fa-directions"></i> Directions
                                            </button>
                                            <button className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition">
                                                <i className="fa-solid fa-bookmark"></i> Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                    {/* Add Activity */}
                    <button className="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-medium hover:border-blue-400 hover:text-blue-600 transition flex items-center justify-center gap-2">
                        <i className="fa-solid fa-plus"></i> Add Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItineraryView;
