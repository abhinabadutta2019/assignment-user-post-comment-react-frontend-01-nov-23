import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CreateForm = () => {
  const { user } = useContext(AuthContext);
  const userObj = JSON.parse(user);

  const formHandler = async (event) => {
    event.preventDefault();
    const contentElement = document.getElementById("content");
    const content = contentElement.value;

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

      if (response.ok) {
        // Form submission successful
        window.alert("Task created successfully"); // Show a success alert
        contentElement.value = ""; // Clear the textarea
      } else {
        const errorData = await response.json();
        window.alert(`Error: ${errorData.message}`); // Show an error alert
      }
    } catch (error) {
      console.error(error);
      window.alert("An error occurred. Please try again."); // Show a generic error alert
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={formHandler}>
        <label>Content</label>
        <textarea id="content" type="text" required />
        <button type="submit">Submit here</button>
      </form>
    </div>
  );
};

export { CreateForm };
