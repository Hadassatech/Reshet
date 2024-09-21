import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useStore } from '../../Store';

const Login = () => {
    const navigate = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Zustand action for logging in user
    const loginUser = useStore((state) => state.loginUser);
    const user = useStore((state) => state.user);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError('Failed to fetch users. Please try again later.');
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const foundUser = users?.find(user =>
            user?.username === usernameOrEmail || user?.email === usernameOrEmail
        );
        // Save authenticated user to Zustand
        if (foundUser) {
            loginUser(foundUser);
            navigate('/dashboard');
        } else {
            setError('שם משתמש או דוא"ל לא נכונים');
        }
    };

    return (
        <div className="login-container">
            <h2>כניסת משתמש</h2>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        className="login-input username-input"
                        placeholder="שם משתמש או דוא\"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="login-input password-input"
                        placeholder="סיסמה"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">כניסה</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            )}
        </div>
    );
};

export default Login;
