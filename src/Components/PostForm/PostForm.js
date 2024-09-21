import React, { useState, useEffect } from 'react';
import './PostForm.css';

const PostForm = ({ post, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
        }
    }, [post]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ title, body });
    };

    return (
        <form onSubmit={handleSubmit} className="post-form-container">
            <div className="form-group-title">
                <label className="form-label-title">כותרת:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="input-title"
                />
            </div>
            <div className="form-group-body">
                <label className="form-label-body">גוף:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    className="textarea-body"
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-submit">שמור</button>
                <button type="button" onClick={onCancel} className="btn-cancel">ביטול</button>
            </div>
        </form>
    );
};

export default PostForm;
