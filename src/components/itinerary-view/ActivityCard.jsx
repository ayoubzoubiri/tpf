import React from 'react';

const ActivityCard = ({ activity }) => {
    const getTimeIcon = (time) => {
        const t = (time || '').toLowerCase();
        if (t.includes('morning')) return { icon: 'fa-sun', bg: 'bg-amber-500' };
        if (t.includes('afternoon')) return { icon: 'fa-cloud-sun', bg: 'bg-orange-500' };
        if (t.includes('evening') || t.includes('night')) return { icon: 'fa-moon', bg: 'bg-indigo-500' };
        if (t.includes('lunch')) return { icon: 'fa-utensils', bg: 'bg-red-500' };
        return { icon: 'fa-location-dot', bg: 'bg-blue-500' };
    };

    const timeInfo = getTimeIcon(activity.time_of_day || activity.time);

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-lg hover:border-blue-100 transition-all group overflow-hidden">
            <div className="flex gap-4">
                {/* Visual: Image or Icon */}
                {activity.activity_image_url ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0 relative">
                        <img 
                            src={activity.activity_image_url} 
                            alt={activity.location} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                         <div className={`absolute top-0 left-0 px-1.5 py-0.5 text-[8px] font-bold text-white ${timeInfo.bg} rounded-br-lg`}>
                            <i className={`fa-solid ${timeInfo.icon} mr-1`}></i>
                            {activity.time_of_day || activity.time}
                        </div>
                    </div>
                ) : (
                    <div className={`w-10 h-10 ${timeInfo.bg} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        <i className={`fa-solid ${timeInfo.icon} text-sm`}></i>
                    </div>
                )}

                {/* Content */}
                <div className="flex-grow min-w-0 flex flex-col justify-between">
                    <div>
                        {!activity.activity_image_url && (
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                                    {activity.time_of_day || activity.time}
                                </span>
                                <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition">
                                    <i className="fa-solid fa-ellipsis"></i>
                                </button>
                            </div>
                        )}
                        
                        <h3 className="font-semibold text-slate-900 text-sm mb-1 leading-snug line-clamp-2">
                            {activity.description}
                        </h3>
                        
                        {/* Meta Row: Rating & Price */}
                        {(activity.activity_rating || activity.activity_price) && (
                            <div className="flex items-center gap-3 mb-2">
                                {activity.activity_rating && (
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <i className="fa-solid fa-star text-[10px]"></i>
                                        <span className="text-xs font-bold">{activity.activity_rating}</span>
                                    </div>
                                )}
                                {activity.activity_price && (
                                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                        {activity.activity_price}
                                    </span>
                                )}
                            </div>
                        )}

                        {activity.location && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <i className="fa-solid fa-location-dot text-slate-400 text-[10px]"></i>
                                <span className="truncate">{activity.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2 mt-2 border-t border-slate-50 items-center">
                        <button className="text-[10px] uppercase font-medium text-slate-400 hover:text-blue-600 flex items-center gap-1 transition">
                            <i className="fa-solid fa-directions"></i> Direction
                        </button>
                        
                        {activity.booking_url ? (
                            <a 
                                href={activity.booking_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm hover:shadow-md"
                            >
                                Book Now <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                            </a>
                        ) : (
                            <button className="ml-auto text-[10px] uppercase font-medium text-slate-400 hover:text-blue-600 flex items-center gap-1 transition">
                                <i className="fa-solid fa-bookmark"></i> Save
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
