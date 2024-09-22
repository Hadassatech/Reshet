import React, { useEffect, useState } from 'react';
import './Post.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PostForm from '../PostForm/PostForm';
import { useStore } from '../../Store';

const Post = ({ post }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const comments = useStore((state) => state.comments[post.id] || []);
    const setComments = useStore((state) => state.setComments);
    const updatePost = useStore((state) => state.updatePost);

    // Fetch comments 
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                const data = await response.json();
                setComments(post.id, data); 
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        // Fetch comments only if not already in Zustand
        if (comments.length === 0) {
            fetchComments();
        }
    }, [post.id, comments.length, setComments]);

    const handleEdit = () => {
        setIsPopupOpen(true);
    };

    const handleCancelEdit = () => {
        setIsPopupOpen(false);
    };

    // Update the post in the Zustand store
    const handleSave = async (updatedPostData) => {
        updatePost(post.id, updatedPostData);

        // Make PUT request to update the post
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPostData),
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

        } catch (error) {
            console.error("Error updating post:", error);
        } finally {
            setIsPopupOpen(false); // Close the popup
        }
    };

    return (
        <div className="post">
            <h2 className='post-title'>{post?.title}</h2>
            <p>{post?.body}</p>
            <button className='edit-btn' onClick={handleEdit}>Edit</button>
            <Popup open={isPopupOpen} onClose={handleCancelEdit} position="right center">
                <div>
                    <PostForm post={post} onSubmit={handleSave} onCancel={handleCancelEdit} />
                </div>
            </Popup>
            <h3>{comments?.length > 0 && 'Comments:'}</h3>
            <ul className="comments-list">
                {comments?.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments?.map((comment) => (
                        <li key={comment.id} className="comment-item">
                            <p><strong>Name: {comment.name}</strong></p>
                            <p>Content: {comment.body}</p>
                            <p>Author: <em>{comment.email}</em></p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Post;
