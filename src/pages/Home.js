// Home.js

import React, { useEffect, useContext } from "react";
import { Post } from "../components/Post";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { posts, fetchPosts, user } = useContext(AuthContext);
  //
  const userObj = JSON.parse(user);

  console.log(userObj, "userObj from Home.js");

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <h2>Posts</h2>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
}

export { Home };
