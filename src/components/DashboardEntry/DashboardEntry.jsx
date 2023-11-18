import Chessboard from 'chessboardjsx';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import './DashboardEntry.css';

const DashboardEntry = ({ post, handleUpvote }) => {
    async function fetchTopComment(postId) {
        const commentsData = await api.getCommentsForPost(postId);
        if (commentsData.length === 0) {
          return { text: 'No comments' };
        }
        const topComment = commentsData.reduce((prev, curr) => {
          return curr.upvotes > prev.upvotes ? curr : prev;
        });
        return topComment;
      }

    return (
        <div key={post.id} className="post-card">
            <div className="post-card-header">
              <h2 className="post-title">
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <div className="players">
                <p className="post-players">White: {post.white_name} ({post.white_elo || '?'})</p>
                <p className="post-players">Black: {post.black_name} ({post.black_elo || '?'})</p>
              </div>
            </div>
            <div className="chessboard-container">
              <div className="board">
                <Chessboard position={post.fen} draggable={false}/>
              </div>
              <div className="pgn-container">
                {post.pgn}
              </div>
            </div>
            <div className="post-details">
              <div className="upvotes">
                <span className="upvotes-count">{post.upvotes}</span>
                <button onClick={() => handleUpvote(post.id)} className="upvote-button">Upvote</button>
              </div>
              <div className="top-comment">{fetchTopComment(post.id).body}</div>
            </div>
        </div>
    );
};

export default DashboardEntry;
