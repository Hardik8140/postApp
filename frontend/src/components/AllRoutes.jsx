import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import Signup from "./Signup";
import Posts from "./Posts";
import EditPost from "./EditPost";
import AddPost from "./AddPost";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/addPost" element={<AddPost />} />
    </Routes>
  );
};

export default AllRoutes;
