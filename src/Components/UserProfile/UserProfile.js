import React, { useEffect } from 'react';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../Store';

const UserProfile = () => {
    const navigate = useNavigate();
    const user = useStore((state) => state.user);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);

    return (
        <div className="user-profile-container">
            <h2 className="profile-heading">פרופיל המשתמש</h2>
            <div className="user-details">
                {user ? (
                    <>
                        <p><span className="label">Name:</span> {user.name}</p>
                        <p><span className="label">Email:</span> {user.email}</p>
                        <p><span className="label">Phone:</span> {user.phone}</p>
                        <p><span className="label">Adsress:</span> {`${user.address.street}, ${user.address.suite}, ${user.address.city}`}</p>
                        <p><span className="label">Company:</span> {user.company.name}</p>
                    </>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
