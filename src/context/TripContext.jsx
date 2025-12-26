import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

// 1. Create the Context
const TripContext = createContext();

// 2. Create the Provider Component
export const TripProvider = ({ children }) => {
    const { user } = useAuth();
    
    // --- State: Trip Planner (Ephemeral) ---
    const [plannerStep, setPlannerStep] = useState(1);
    const [plannerData, setPlannerData] = useState({ 
        destination: '', 
        startDate: null, 
        endDate: null, 
        budget: 'Moderate', 
        interests: [] 
    });
    const [generatedTrip, setGeneratedTrip] = useState(null);
    const [plannerLoading, setPlannerLoading] = useState(false);
    const [plannerError, setPlannerError] = useState(null);

    // --- State: My Trips (Persistent) ---
    const [myTrips, setMyTrips] = useState([]);
    const [myTripsLoading, setMyTripsLoading] = useState(false);
    const [myTripsError, setMyTripsError] = useState(null);

    // --- Helper: Calculate Duration ---
    const calculateDuration = (start, end) => {
        if (!start || !end) return 3; // Default
        const diffTime = Math.abs(new Date(end) - new Date(start));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays > 0 ? diffDays + 1 : 1;
    };

    // --- Action: Generate Trip ---
    const generateTrip = async () => {
        setPlannerLoading(true);
        setPlannerError(null);
        setPlannerStep(2); // Move to loading step

        try {
            const response = await api.post('/plan', {
                destination: plannerData.destination,
                duration: calculateDuration(plannerData.startDate, plannerData.endDate),
                budget: plannerData.budget,
                interests: plannerData.interests.join(', ')
            });
            
            setGeneratedTrip(response.data);
            setPlannerStep(3); // Move to results step
        } catch (err) {
            console.error('Trip generation error:', err);
            setPlannerError(err.response?.data?.error || 'Failed to generate itinerary. Please try again.');
            setPlannerStep(1); // Go back to form
            // Specifically handling the move back usually happens in UI, but here we reset state
        } finally {
            setPlannerLoading(false);
        }
    };

    // --- Action: Reset Planner ---
    const resetPlanner = () => {
        setPlannerStep(1);
        setGeneratedTrip(null);
        setPlannerError(null);
    };

    // --- Action: Fetch My Trips ---
    const fetchMyTrips = async () => {
        if (!user) return;
        setMyTripsLoading(true);
        try {
            const response = await api.get('/trips');
            setMyTrips(response.data);
        } catch (err) {
            console.error('Fetch trips error:', err);
            setMyTripsError('Failed to load your trips.');
        } finally {
            setMyTripsLoading(false);
        }
    };

    // --- Action: Delete Trip ---
    const deleteTrip = async (id) => {
        if (!window.confirm('Are you sure you want to delete this trip?')) return;
        
        try {
            await api.delete(`/trips/${id}`);
            // Optimistic update: remove from local state immediately
            setMyTrips(prev => prev.filter(trip => trip.id !== id));
        } catch (err) {
            console.error('Delete trip error:', err);
            alert('Failed to delete trip.');
        }
    };

    // Load trips when user logs in
    useEffect(() => {
        if (user) {
            fetchMyTrips();
        } else {
            setMyTrips([]);
        }
    }, [user]);

    // 3. Export Values
    const value = {
        // Planner
        plannerStep,
        setPlannerStep,
        plannerData,
        setPlannerData,
        generatedTrip,
        plannerLoading,
        plannerError,
        generateTrip,
        resetPlanner,
        calculateDuration,

        // My Trips
        myTrips,
        myTripsLoading,
        myTripsError,
        fetchMyTrips,
        deleteTrip
    };

    return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

// 4. Custom Hook for easy usage
export const useTrip = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error('useTrip must be used within a TripProvider');
    }
    return context;
};

export default TripContext;
