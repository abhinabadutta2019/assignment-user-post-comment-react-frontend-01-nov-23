import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //
  const [posts, setPosts] = useState([]);

  //   const updatePosts = (data) => {
  //     setPosts(data);
  //   };

  //
  async function fetchPosts() {
    try {
      const response = await fetch(
        "https://assignment-post-comment-typescript.onrender.com/posts"
      );
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
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    //
    setUser(userData);
  };
  //
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    console.log("Logout called");
  };

  //
  useEffect(() => {
    //
    const fetchUserLS = async () => {
      try {
        // console.log("calling fetchUserLS ");
        const user = localStorage.getItem("user");
        //
        setUser(user);
      } catch (err) {
        console.error("Error fetching data in AuthContext:", err);
      }
      //
    };

    // console.log("user: in fetchUserLS ", user);
    // calling the function-
    fetchUserLS();
    //
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout, posts, fetchPosts }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthContextProvider };
