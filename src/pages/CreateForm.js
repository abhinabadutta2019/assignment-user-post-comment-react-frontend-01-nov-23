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
      const response = await fetch(
        "https://assignment-post-comment-typescript.onrender.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userObj.token}`,
          },
          body: JSON.stringify({
            content: content,
          }),
        }
      );

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
    <div className="container mt-4">
      <h2 className="mb-4">Create Post</h2>
      <form onSubmit={formHandler}>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea id="content" className="form-control" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export { CreateForm };
