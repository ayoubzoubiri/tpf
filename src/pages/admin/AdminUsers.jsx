import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import UsersTable from '../../components/admin/users/UsersTable';
import UserModal from '../../components/admin/users/UserModal';

const AdminUsers = () => {
    const { users, loading, fetchUsers, deleteUser, createUser, updateUser } = useAdmin();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateClick = () => {
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '', role: 'user' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email, password: '', role: user.role });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = isEditing 
            ? await updateUser(selectedUser.id, formData)
            : await createUser(formData);
        
        if (success) {
            setShowModal(false);
            setFormData({ name: '', email: '', password: '', role: 'user' });
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
            <div className="flex justify-end mb-4">
                <button 
                    onClick={handleCreateClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                >
                    <i className="fa-solid fa-plus"></i> Add User
                </button>
            </div>

            <UsersTable 
                users={users} 
                onEdit={handleEditClick} 
                onDelete={deleteUser} 
            />

            <UserModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
                isEditing={isEditing}
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
        </div>
    );
};

export default AdminUsers;
