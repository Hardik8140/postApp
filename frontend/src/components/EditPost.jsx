import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editPost, setEditPost] = useState({ title: "", body: "" });

  useEffect(() => {
    if (location.state && location.state.postEdit) {
      const { title, body } = location.state.postEdit;
      setEditPost({ title, body });
    }
  }, [location.state]);

  const handleEdit = () => {
    const { title, body } = editPost;
    const postId = location.state.postId;

    fetch(`http://localhost:8080/posts/update/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, body }),
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
      <h2>Edit Post</h2>
      <input
        type="text"
        placeholder="Enter Your title"
        name="title"
        value={editPost.title}
        onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Enter body"
        name="body"
        value={editPost.body}
        onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
      />

      <button onClick={handleEdit}>Submit</button>
    </div>
  );
};

export default EditPost;
