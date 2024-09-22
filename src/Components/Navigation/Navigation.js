import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../Store';
import './Navigation.css';

const Navigation = () => {
    const navigate = useNavigate();
    const logoutUser = useStore((state) => state.logoutUser);

    // Clear user from Zustand store and localStorage and than redirect to login page after logout
    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem('authenticatedUser');
        navigate('/');
    };

    const user = useStore((state) => state.user);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBRsVmWJ4LLPdl6BwRlQRANmoWBa_Mii40rzXaIWNXLzZNHK5IVecWZMcGW82xo0IVis&usqp=CAU"
                        alt="Reshet Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user && (
                            <>
                                <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                                <Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {user && (
                        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
