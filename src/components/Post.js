import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Post({ post }) {
  const { user, fetchPosts } = useContext(AuthContext);
  const userObj = JSON.parse(user);
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [loginToComment, setLoginToComment] = useState(false);

  const addCommentHandler = async () => {
    if (userObj) {
      setShowCommentInput(true);
    } else {
      setLoginToComment(true);
    }
  };

  const submitCommentHandler = async () => {
    if (userObj) {
      const response = await fetch(
        `https://assignment-post-comment-typescript.onrender.com/posts/comment/${post._id}`,
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
        setNewComment("");
        setShowCommentInput(false);
        setLoginToComment(false);
        fetchPosts();
        window.alert("Comment added successfully!");
      } else {
        console.error("Error adding comment");
        window.alert("Error adding comment. Please try again.");
      }
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Post: {post.content}</h2>
        <h5 className="card-subtitle mb-2 text-muted">
          Posted by: {post.user.username}
        </h5>
        <h5 className="card-subtitle mb-2 text-muted">Comments:</h5>
        <button className="btn btn-primary" onClick={addCommentHandler}>
          Add comments
        </button>

        {showCommentInput && (
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="btn btn-success mt-2"
              onClick={submitCommentHandler}
            >
              Submit
            </button>
          </div>
        )}

        {loginToComment && <p className="mt-3">Login to add a comment.</p>}

        <ul className="list-group mt-3">
          {post.comments.map((comment, index) => (
            <li key={index} className="list-group-item">
              <p className="card-text">User: {comment.user.username}</p>
              <p className="card-text">Comment: {comment.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { Post };
