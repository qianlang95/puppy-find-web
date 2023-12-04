import './Posts.css';
import React from 'react';

const Posts = ({ postList }) => {
  return (
    <div>
      <h3>Posts</h3>
      <ul>
        {postList.map(post => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;

