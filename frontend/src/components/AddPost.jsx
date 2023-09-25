import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [device, setDevice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const newPost = { title, body, device };
    fetch(`http://localhost:8080/posts/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        navigate("/posts");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Your title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter body"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <select onChange={(e) => setDevice(e.target.value)} value={device}>
        <option value="">Select Device</option>
        <option value="pc">PC</option>
        <option value="mobile">Mobile</option>
        <option value="tablet">Tablet</option>
      </select>

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default AddPost;
