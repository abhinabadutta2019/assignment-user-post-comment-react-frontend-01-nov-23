import React from "react";

function Post({ post }) {
  //
  const addCommentHandler = () => {};
  //
  return (
    <div key={post._id}>
      <h2>Post: {post.content}</h2>
      <h3>Comments:</h3>
      {/*  */}
      <button onClick={addCommentHandler}>Add comments</button>
      <ul>
        {post.comments.map((comment, index) => (
          //
          <li key={index}>
            <p>User: {comment.user.username}</p>
            <p>Comment: {comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Post };
