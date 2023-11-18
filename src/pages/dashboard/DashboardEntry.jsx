import Chessboard from 'chessboardjsx';
import { Link } from 'react-router-dom';

const DashboardEntry = ({ post }) => {
    return (
        <div key={post.id} className="post-card">
            <h2 className="post-title">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <div className="chessboard-container">
              <Chessboard position={post.fen} />
            </div>
            <div className="post-details">
              <div className="upvotes">
                <span className="upvotes-count">{post.upvotes}</span>
                <button onClick={() => handleUpvote(post.id)} className="upvote-button">Upvote</button>
              </div>
              <div className="top-comment">{fetchTopComment(post.id).text}</div>
            </div>
        </div>
    );
};

export default DashboardEntry;
