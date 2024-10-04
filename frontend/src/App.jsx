import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Pages/component/Navbar";
import Homepage from "./Pages/Homepage";
import CreateBlog from "./Pages/CreateBlog";
import BlogPost from "./Pages/BlogPost ";
import UpdateBlogPost from "./Pages/UpdateBlogPost ";
import Footer from "./Pages/component/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path= "/blogs/:id"  element={<BlogPost/>} />
        <Route path="/blogs/update/:id/" element={<UpdateBlogPost/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
