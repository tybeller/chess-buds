
import { useState } from 'react';
import { supabase } from '../client';
import './CreatePost.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.from('forumpost').insert({ title, content });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={title} onChange={handleTitleChange} />

      <label htmlFor="content">Content:</label>
      <textarea id="content" value={content} onChange={handleContentChange} />

      <button type="submit" >
        Submit
      </button>
    </form>
  );
}
