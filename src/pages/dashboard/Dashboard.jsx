import { useState, useEffect } from 'react';
import { api } from '../../api';
import Chessboard from 'chessboardjsx';
import { Link } from 'react-router-dom';
import DashboardEntry from '../../components/DashboardEntry/DashboardEntry';
import './Dashboard.css';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('upvotes'); // add state variable for sort option

  useEffect(() => {
    async function fetchPosts() {
      const postsData = await api.getPosts();
      setPosts(postsData);
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // add function to handle sorting
  function handleSort(option) {
    setSortOption(option);
    let sortedPosts = [];
    if (option === 'upvotes') {
      sortedPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes);
    } else if (option === 'time') {
      sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    setPosts(sortedPosts);
  }

  function handleUpvote(postId) {
    const updatedPosts = [...posts];
    const postToUpdate = updatedPosts.find((post) => post.id === postId);
    const newVoteCount = postToUpdate.upvotes + 1;
    postToUpdate.upvotes = newVoteCount;
    setPosts(updatedPosts);

    api.upvotePost(postId, newVoteCount);
  }

  return (
    <div className="whole-page">
      <h1>Past Games</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <span>Sort by:</span>
        <button onClick={() => handleSort('upvotes')} disabled={sortOption === 'upvotes'}>Upvotes</button>
        <button onClick={() => handleSort('time')} disabled={sortOption === 'time'}>Time Created</button>
      </div>
      <div className="post-container">
        {filteredPosts.map((post) => (
          <DashboardEntry key={post.id} post={post} handleUpvote={handleUpvote} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
