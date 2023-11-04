// Home.js

import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";

function Home() {
  const [posts, setPosts] = useState([]);

  //
  async function fetchPosts() {
    try {
      const response = await fetch("http://localhost:3006/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      //
      console.log(data, "data");
      //
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //

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
