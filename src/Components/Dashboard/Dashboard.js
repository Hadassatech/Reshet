import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import './Dashboard.css';
import Popup from 'reactjs-popup';
import { useStore } from '../../Store';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useStore((state) => state.user);
    const posts = useStore((state) => state.posts);
    const setPosts = useStore((state) => state.setPosts);
    const addPost = useStore((state) => state.addPost);
    const updatePost = useStore((state) => state.updatePost);

    const [loading, setLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (user && !hasFetched) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts?userId=${user?.id}`);
                    const data = await response.json();
                    setPosts(data);
                    setHasFetched(true);
                } catch (error) {
                    console.error("Error fetching posts:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPosts();
        }
    }, [user, hasFetched, setPosts]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);

    const createPost = async (post) => {
        try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/posts?userId=${user?.id}`, {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const newPost = await response.json();
            newPost.userId = user.id; 

            // Update Zustand store with the new post
            addPost(newPost); 
            setPosts([...posts, newPost]);
            setIsPopupOpen(false);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleCancelEdit = () => {
        setIsPopupOpen(false);
    };

    if (loading) {
        return <div>Loading posts...</div>;
    }

    return (
        <div className='wrapper-div'>
            <h1>User Details</h1>
            <div className='user-details'>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>User-Name: {user.username}</p>
                <button onClick={() => navigate('/profile')}>User Profile</button>
            </div>
            <div className="center-button">
                <button className="create-post-btn" onClick={() => setIsPopupOpen(true)}>Create New Post</button>
            </div>
            <Popup
                open={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                position="right center"
                className="popup-content"
            >
                <div className="popup-inner">
                    <h1 className='user-posts'>Create new post</h1>
                    <PostForm onSubmit={createPost} onCancel={handleCancelEdit} />
                </div>
            </Popup>
            <ul>
                <h2 className='posts'>Posts</h2>
                <div className="posts-container">
                    {posts?.map((post) => (
                        <div key={post.id} className="post-item">
                            <Post post={post} updatePost={updatePost} />
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default Dashboard;