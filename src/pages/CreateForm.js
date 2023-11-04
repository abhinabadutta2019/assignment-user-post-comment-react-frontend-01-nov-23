import { useState, useContext } from "react";
//
import { AuthContext } from "../context/AuthContext";
//
const CreateForm = () => {
  //
  const { user } = useContext(AuthContext);
  const userObj = JSON.parse(user);
  //
  const [message, setMessage] = useState(""); // State variable for error
  //
  if (userObj) {
    // const userObj = JSON.parse(user);
    const token = userObj.token;
    console.log(token, "token:from CreateForm.js");
  }
  //
  const formHandler = async (event) => {
    //
    event.preventDefault();
    const contentElement = document.getElementById("content");
    const content = contentElement.value; // Extract the value from the textarea
    // console.log(content, "content in CreateForm.js");
    //
    try {
      const response = await fetch("http://localhost:3006/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userObj.token}`,
        },
        body: JSON.stringify({
          content: content,
        }),
      });
      //
      if (response.ok) {
        //getting respone as json
        const result = await response.json();
        setMessage("Task created succssfully");

        // console.log(result, "result");
      } else {
        const errorData = await response.json();

        setMessage(errorData);
      }
    } catch (error) {
      console.log(error);
    }
    //
  };
  //
  return (
    <div>
      <h2>Create Post</h2>
      {message && <p>{message}</p>}
      <form onSubmit={formHandler}>
        <label>Content</label>
        <textarea id="content" type="text" required />
        {/*  */}
        <button type="submit">Submit here</button>
      </form>
    </div>
  );
};

export { CreateForm };
