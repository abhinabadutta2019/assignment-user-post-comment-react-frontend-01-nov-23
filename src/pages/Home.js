import React, { useEffect, useContext } from "react";
import { Post } from "../components/Post";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { posts, fetchPosts, user } = useContext(AuthContext);
  const userObj = JSON.parse(user);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div
      className="container mt-4"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <h1 className="mb-4">Posts Timeline</h1>
      <ul className="list-group">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li className="list-group-item" key={post._id}>
              <Post post={post} />
            </li>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
}

export { Home };
