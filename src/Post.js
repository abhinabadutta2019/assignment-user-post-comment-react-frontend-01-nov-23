import React from "react";

function Post({ post }) {
  return (
    <div key={post._id}>
      <h2>Post: {post.content}</h2>
      <h3>Comments:</h3>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment._id}>
            <p>User: {comment.user}</p>
            <p>Comment: {comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Post };
