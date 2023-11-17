import { useState, useEffect } from 'react';
import { api } from '../../api';
import Chessboard from 'chessboardjsx';
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

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // add function to handle sorting
  function handleSort(option) {
    setSortOption(option);
    if (option === 'upvotes') {
      setPosts([...posts].sort((a, b) => b.upvotes - a.upvotes));
    } else if (option === 'time') {
      setPosts([...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  }

  return (
    <div className="whole-page">
      <h1>Dashboard</h1>
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
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Game</th>
            <th>Top Comment</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className="title">{post.title}</td>
              <td className="upvotes">{post.upvotes}</td>
              <td>
                <Chessboard position={post.fen}/>

              </td>
              <td>{fetchTopComment(post.id).text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
