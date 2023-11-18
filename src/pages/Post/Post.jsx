import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { Chess } from 'chess.js';
import ChessBoard from 'chessboardjsx';
import './Post.css'; 

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newCommentAuthor, setNewCommentAuthor] = useState(''); // Add state for the new comment author
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedWhiteName, setEditedWhiteName] = useState('');
    const [editedWhiteElo, setEditedWhiteElo] = useState(0);
    const [editedBlackName, setEditedBlackName] = useState('');
    const [editedBlackElo, setEditedBlackElo] = useState(0);

    useEffect(() => {
        async function fetchPost() {
            const postData = await api.getPostById(id);
            setPost(postData);
            setEditedTitle(postData.title);
            setEditedWhiteName(postData.white_name);
            setEditedWhiteElo(postData.white_elo);
            setEditedBlackName(postData.black_name);
            setEditedBlackElo(postData.black_elo);
        }
        fetchPost();
    }, [id]);

    useEffect(() => {
        async function fetchComments() {
            const commentsData = await api.getCommentsForPost(id);
            setComments(commentsData);
        }
        fetchComments();
    }, [id]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentAuthorChange = (event) => { // Handle the change event for the new comment author
        setNewCommentAuthor(event.target.value);
    };

    const handleAddComment = async () => {
        // Make an API call to add the comment
        await api.createComment({
            postId: id,
            body: newComment,
            author: newCommentAuthor, // Pass the new comment author to the API call
        });

        // Fetch the updated comments
        const commentsData = await api.getCommentsForPost(id);
        setComments(commentsData);

        // Clear the comment input fields
        setNewComment('');
        };

    const handleDeletePost = async () => {
        // Make an API call to delete the post
        await api.deletePost(id);

        // Redirect to the dashboard
        navigate('/dashboard');
    };

    const handleEditPost = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setEditedTitle(post.title);
        setEditedWhiteName(post.white_name);
        setEditedWhiteElo(post.white_elo);
        setEditedBlackName(post.black_name);
        setEditedBlackElo(post.black_elo);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'title':
                setEditedTitle(value);
                break;
            case 'white_name':
                setEditedWhiteName(value);
                break;
            case 'white_elo':
                setEditedWhiteElo(value);
                break;
            case 'black_name':
                setEditedBlackName(value);
                break;
            case 'black_elo':
                setEditedBlackElo(value);
                break;
            default:
                break;
        }
    };

    const handleEditSubmit = async () => {
        // Make an API call to update the post
        await api.updatePost(id, {
            title: editedTitle,
            white_name: editedWhiteName,
            white_elo: editedWhiteElo,
            black_name: editedBlackName,
            black_elo: editedBlackElo,
        });

        // Fetch the updated post
        const postData = await api.getPostById(id);
        setPost(postData);

        // Exit editing mode
    };

    const handleUpvoteComment = async (commentId) => {
        // Make an API call to upvote the comment
        const currCount = comments.find((comment) => comment.id === commentId).upvotes;
        await api.upvoteComment(commentId, currCount + 1);

        // Fetch the updated comments
        const commentsData = await api.getCommentsForPost(id);
        console.log(commentsData)
        setComments(commentsData);
    };

    return (
        <div className="post-page">
            {editing ? (
                <div>
                    <h2>Edit Post</h2>
                    <form>
                        <label>Title:</label>
                        <input type="text" name="title" value={editedTitle} onChange={handleInputChange} />
                        <label>White Name:</label>
                        <input type="text" name="white_name" value={editedWhiteName} onChange={handleInputChange} />
                        <label>White Elo:</label>
                        <input type="number" name="white_elo" value={editedWhiteElo} onChange={handleInputChange} />
                        <label>Black Name:</label>
                        <input type="text" name="black_name" value={editedBlackName} onChange={handleInputChange} />
                        <label>Black Elo:</label>
                        <input type="number" name="black_elo" value={editedBlackElo} onChange={handleInputChange} />
                        <button type="submit" onClick={handleEditSubmit}>Save</button>
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    </form>
                </div>
            ) : (
                <div>
                    <h1>{post ? post.title : 'Loading...'}</h1>
                    <h2>White: {post ? post.white_name : 'Loading...'} ({post ? post.white_elo : 'Loading...'}) Black: {post ? post.black_name : 'Loading...'} ({post ? post.black_elo : 'Loading...'})</h2>
                    <ChessBoard position={post ? post.fen : ''} draggable={false} />
                    <button onClick={handleEditPost}>Edit Post</button>
                    <button onClick={handleDeletePost}>Delete Post</button>
                </div>
            )}
            <div>
                <h2>Comments:</h2>
                {comments.map((comment) => (
                    <span key={comment.id} className="comment">
                        <button className= "upvote-button" onClick={() => handleUpvoteComment(comment.id)}>^ {comment.upvotes}</button>
                        <p><b>{comment.author}:</b> {comment.body}</p>
                    </span>
                ))}
                <div>
                    <input type="text" value={newCommentAuthor} onChange={handleCommentAuthorChange} placeholder="Your Name" /> {/* Add input field for the new comment author */}
                    <input type="text" value={newComment} onChange={handleCommentChange} placeholder="Your Comment" /> {/* Modify the input field for the new comment */}
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>
            </div>
        </div>
    );
};

export default Post;
