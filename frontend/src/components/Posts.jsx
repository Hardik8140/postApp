import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    fetch("http://localhost:8080/posts", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPost(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/posts/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getPost();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const postEdit = post.find((el) => el._id === id);
    navigate(`/edit/${id}`, { state: { postId: id, postEdit } });
  };
  return (
    <div>
      <h2>See the Post</h2>
      <h4>Posts are {post.length}</h4>
      {post.map((el) => (
        <div key={el.id}>
          <h2>{el.title}</h2>
          <p>{el.body}</p>
          <p>{el.device}</p>
          <button onClick={() => handleEdit(el._id)}>Edit</button>
          <button onClick={() => handleDelete(el._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;
