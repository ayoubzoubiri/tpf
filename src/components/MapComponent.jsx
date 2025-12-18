import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Geocoding cache
const geocodeCache = {};

// Geocode a location using Nominatim
const geocodeLocation = async (location, destination, retries = 2) => {
    if (!location) return null;
    
    // Try different search queries
    const queries = [
        `${location}, ${destination}`,
        `${location}`,
        destination
    ];

    for (const query of queries) {
        // Check cache
        if (geocodeCache[query]) {
            return geocodeCache[query];
        }
        
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                // Add delay to avoid rate limiting
                if (attempt > 0) await new Promise(r => setTimeout(r, 1000));
                
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
                    { 
                        headers: { 
                            'User-Agent': 'Toplago/1.0',
                            'Accept-Language': 'en'
                        } 
                    }
                );
                
                if (!response.ok) continue;
                
                const data = await response.json();
                
                if (data && data.length > 0) {
                    const result = { 
                        lat: parseFloat(data[0].lat), 
                        lng: parseFloat(data[0].lon),
                        name: data[0].display_name 
                    };
                    geocodeCache[query] = result;
                    return result;
                }
            } catch (error) {
                console.warn(`Geocoding attempt ${attempt + 1} failed for: ${query}`);
            }
        }
    }
    
    return null;
};

// Get destination center as fallback
const getDestinationCenter = async (destination) => {
    if (!destination) return null;
    
    if (geocodeCache[`center_${destination}`]) {
        return geocodeCache[`center_${destination}`];
    }
    
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&limit=1`,
            { headers: { 'User-Agent': 'Toplago/1.0' } }
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
            const result = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            geocodeCache[`center_${destination}`] = result;
            return result;
        }
    } catch (error) {
        console.error('Failed to geocode destination:', error);
    }
    return null;
};

// Fit map to markers
const MapBounds = ({ markers }) => {
    const map = useMap();
    useEffect(() => {
        if (markers.length > 0) {
            const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
            map.flyToBounds(bounds, { padding: [60, 60], maxZoom: 14, duration: 0.8 });
        }
    }, [markers, map]);
    return null;
};

// Get marker color
const getMarkerColor = (time) => {
    const t = (time || '').toLowerCase();
    if (t.includes('morning')) return '#f59e0b';
    if (t.includes('afternoon')) return '#f97316';
    if (t.includes('evening') || t.includes('night')) return '#6366f1';
    if (t.includes('lunch')) return '#ef4444';
    return '#3b82f6';
};

// Create marker icon with number
const createMarkerIcon = (time, number) => {
    const color = getMarkerColor(time);
    
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: 36px;
                height: 36px;
                background: ${color};
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 14px;
                font-family: system-ui, sans-serif;
            ">
                ${number}
            </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
};

const MapComponent = ({ activities, day, destination }) => {
    const [geocodedActivities, setGeocodedActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [failedCount, setFailedCount] = useState(0);
    const [mapCenter, setMapCenter] = useState([33.5731, -7.5898]); // Default

    // Geocode all activities
    const geocodeAllActivities = useCallback(async () => {
        if (!activities || activities.length === 0) {
            setGeocodedActivities([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setFailedCount(0);
        
        // First, get the destination center for fallback positioning
        const destCenter = await getDestinationCenter(destination);
        if (destCenter) {
            setMapCenter([destCenter.lat, destCenter.lng]);
        }

        let failed = 0;
        const results = [];

        // Process each activity sequentially to avoid rate limiting
        for (let i = 0; i < activities.length; i++) {
            const activity = activities[i];
            
            // If already has coordinates
            if (activity.latitude && activity.longitude) {
                results.push({
                    ...activity,
                    lat: parseFloat(activity.latitude),
                    lng: parseFloat(activity.longitude),
                    index: i,
                    number: i + 1
                });
                continue;
            }
            
            // Try to geocode the location
            const location = activity.location || '';
            const coords = await geocodeLocation(location, destination || '');
            
            if (coords) {
                // Add small offset for each activity to prevent overlapping
                const angle = (i / activities.length) * 2 * Math.PI;
                const offset = 0.001 * (i + 1); // ~100m offset
                
                results.push({
                    ...activity,
                    lat: coords.lat + (Math.sin(angle) * offset),
                    lng: coords.lng + (Math.cos(angle) * offset),
                    index: i,
                    number: i + 1,
                    geocodedName: coords.name
                });
            } else if (destCenter) {
                // Fallback: place near destination center with offset
                const angle = (i / activities.length) * 2 * Math.PI;
                const offset = 0.005 + (i * 0.002); // Spread around center
                
                results.push({
                    ...activity,
                    lat: destCenter.lat + (Math.sin(angle) * offset),
                    lng: destCenter.lng + (Math.cos(angle) * offset),
                    index: i,
                    number: i + 1,
                    isFallback: true
                });
                failed++;
            } else {
                failed++;
            }
            
            // Small delay between requests
            if (i < activities.length - 1) {
                await new Promise(r => setTimeout(r, 300));
            }
        }
        
        setGeocodedActivities(results);
        setFailedCount(failed);
        setIsLoading(false);
    }, [activities, destination]);

    useEffect(() => {
        geocodeAllActivities();
    }, [geocodeAllActivities]);

    // Path coordinates
    const pathCoordinates = geocodedActivities.map(a => [a.lat, a.lng]);
    
    // Center on first marker or destination
    const center = geocodedActivities.length > 0 
        ? [geocodedActivities[0].lat, geocodedActivities[0].lng]
        : mapCenter;

    return (
        <div className="h-full w-full relative">
            {/* Loading overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-[1000] flex items-center justify-center">
                    <div className="text-center">
                        <i className="fa-solid fa-spinner animate-spin text-blue-600 text-3xl mb-3"></i>
                        <p className="text-slate-600 font-medium">Loading locations...</p>
                        <p className="text-slate-400 text-sm">Finding places on map</p>
                    </div>
                </div>
            )}
            
            {/* Warning if some locations failed */}
            {!isLoading && failedCount > 0 && (
                <div className="absolute top-3 left-3 right-3 z-[1000] bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <span>{failedCount} location(s) shown at approximate position</span>
                </div>
            )}
            
            <MapContainer 
                center={center} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                
                {geocodedActivities.length > 0 && <MapBounds markers={geocodedActivities} />}

                {/* Route line */}
                {pathCoordinates.length > 1 && (
                    <Polyline 
                        positions={pathCoordinates} 
                        pathOptions={{ 
                            color: '#3b82f6', 
                            weight: 3, 
                            opacity: 0.6, 
                            dashArray: '8, 8' 
                        }} 
                    />
                )}

                {/* Activity markers */}
                {geocodedActivities.map((activity) => (
                    <Marker 
                        key={activity.index} 
                        position={[activity.lat, activity.lng]}
                        icon={createMarkerIcon(activity.time_of_day || activity.time, activity.number)}
                    >
                        <Tooltip 
                            direction="top" 
                            offset={[0, -40]} 
                            permanent
                            className="!bg-slate-800 !text-white !border-0 !text-[11px] !font-medium !px-2 !py-1 !rounded-md !shadow-lg"
                        >
                            {(activity.time_of_day || activity.time || '').split(' ')[0]}
                        </Tooltip>
                        
                        <Popup>
                            <div className="font-sans min-w-[220px] max-w-[280px]">
                                <div 
                                    className="text-xs font-bold text-white px-2 py-1 rounded mb-2 inline-block"
                                    style={{ backgroundColor: getMarkerColor(activity.time_of_day || activity.time) }}
                                >
                                    {activity.time_of_day || activity.time}
                                </div>
                                <h3 className="font-bold text-sm text-slate-900 mb-2 leading-tight">
                                    {activity.description}
                                </h3>
                                {activity.location && (
                                    <p className="text-xs text-slate-500 flex items-start gap-1">
                                        <i className="fa-solid fa-location-dot mt-0.5 text-blue-500"></i>
                                        <span>{activity.location}</span>
                                    </p>
                                )}
                                {activity.isFallback && (
                                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                        <i className="fa-solid fa-info-circle"></i>
                                        Approximate location
                                    </p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
