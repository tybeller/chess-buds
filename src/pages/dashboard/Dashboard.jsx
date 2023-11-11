import { useState, useEffect } from 'react';
import { api } from '../../api';


function Dashboard() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Top Comment</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.upvotes}</td>
              <td>{fetchTopComment(post.id).text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
