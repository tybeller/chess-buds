import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api';

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        async function fetchPost() {
            const postData = await api.getPostById(id);
            setPost(postData);
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

    const handleAddComment = async () => {
        // Make an API call to add the comment
        await api.createComment({
            postId: id,
            body: newComment,
        });

        // Fetch the updated comments
        const commentsData = await api.getCommentsForPost(id);
        setComments(commentsData);

        // Clear the comment input field
        setNewComment('');
    };

    return (
        <div>
            {post ? (
                <div>
                    <h1>{post.title}</h1>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <h3>Comments:</h3>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.body}</p>
                </div>
            ))}
            <div>
                <input type="text" value={newComment} onChange={handleCommentChange} />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default Post;
