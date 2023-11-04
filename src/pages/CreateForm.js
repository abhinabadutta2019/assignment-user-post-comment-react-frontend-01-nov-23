import { useState, useContext } from "react";
//
import { AuthContext } from "../context/AuthContext";
//
const CreateForm = () => {
  //
  const { user } = useContext(AuthContext);
  const userObj = JSON.parse(user);
  //
  return (
    <div>
      <h2>Create Post</h2>
      <form>
        <label>Content</label>
        <textarea id="content" type="text" required />
        {/*  */}
        <button type="submit">Submit here</button>
      </form>
    </div>
  );
};

export { CreateForm };
