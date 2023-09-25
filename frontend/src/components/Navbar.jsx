import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/posts">Post</Link>
      <Link to="/addPost">Add Post</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">SignUp</Link>
    </>
  );
};

export default Navbar;
