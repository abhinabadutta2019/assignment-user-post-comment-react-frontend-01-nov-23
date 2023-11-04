import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Post({ post }) {
  const { user, fetchPosts } = useContext(AuthContext);
  const userObj = JSON.parse(user);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [loginToComment, setLoginToComment] = useState(false); // State for login message

  const addCommentHandler = async () => {
    if (userObj) {
      setShowCommentInput(true);
    } else {
      // If the user is not logged in, show a message
      setLoginToComment(true);
    }
  };

  const submitCommentHandler = async () => {
    if (userObj) {
      const response = await fetch(
        `http://localhost:3006/posts/comment/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userObj.token}`,
          },
          body: JSON.stringify({ comment: newComment }),
        }
      );

      if (response.ok) {
        // Successfully added comment, you may want to refresh the post data or update the UI accordingly
        // Optionally, you can clear the newComment state and hide the comment input field
        setNewComment("");
        setShowCommentInput(false);
        setLoginToComment(false); // Hide the login message if it was shown
        fetchPosts();
      } else {
        // Handle errors if needed
        console.error("Error adding comment");
      }
    }
  };

  return (
    <div key={post._id}>
      <h2>Post: {post.content}</h2>
      <h3>Comments:</h3>
      <button onClick={addCommentHandler}>Add comments</button>

      {showCommentInput && (
        <div>
          <input
            type="text"
            placeholder="Type your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={submitCommentHandler}>Submit</button>
        </div>
      )}

      {loginToComment && <p>Login to add a comment.</p>}

      <ul>
        {post.comments.map((comment, index) => (
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
