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
      // console.log(userObj, "userObj from Post.js");
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
        // Successfully added comment
        setNewComment("");
        setShowCommentInput(false);
        setLoginToComment(false);
        fetchPosts();
        window.alert("Comment added successfully!"); // Show a success alert
      } else {
        // Handle errors if needed
        console.error("Error adding comment");
        window.alert("Error adding comment. Please try again."); // Show an error alert
      }
    }
  };

  return (
    <div key={post._id}>
      <h2>Post: {post.content}</h2>
      <h3>Posted by: {post.user.username}</h3>
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
