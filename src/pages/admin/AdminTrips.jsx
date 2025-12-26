import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import TripsTable from '../../components/admin/trips/TripsTable';
import TripModal from '../../components/admin/trips/TripModal';

const AdminTrips = () => {
    const { trips, loading, fetchTrips, deleteTrip, updateTrip } = useAdmin();
    const [showModal, setShowModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [formData, setFormData] = useState({ trip_title: '', destination: '', duration: 1 });

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleEditClick = (trip) => {
        setSelectedTrip(trip);
        setFormData({ trip_title: trip.trip_title, destination: trip.destination, duration: trip.duration });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateTrip(selectedTrip.id, formData);
        if (success) {
            setShowModal(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <i className="fa-solid fa-spinner animate-spin text-blue-600 text-2xl"></i>
            </div>
        );
    }

    return (
        <div>
            <TripsTable 
                trips={trips} 
                onEdit={handleEditClick} 
                onDelete={deleteTrip} 
            />

            <TripModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
        </div>
    );
};

export default AdminTrips;
