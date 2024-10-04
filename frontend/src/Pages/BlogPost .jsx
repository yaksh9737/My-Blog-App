import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7890/BlogPersonalApp/blog/${id}`
        ); // Adjust the URL according to your API
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:7890/BlogPersonalApp/blog/delete/${id}`
      ); // Adjust the URL according to your API
      navigate("/"); // Redirect to homepage or blog list after deleting
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete post");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title mb-3">{post.title}</h1>
          <p className="card-text">
            {post.description}
          </p>
          <p className="text-muted">
            <strong>Author: </strong> {post.author}
          </p>
          <p className="text-muted">
            <strong>Published on: </strong> {formatDate(post.createdAt)}
          </p>

          <div className="d-flex justify-content-between mt-4">
            <Link
              to={`/blogs/update/${id}`}
              className="btn btn-primary"
            >
              <i className="fa-solid fa-pen me-2"></i>Edit Post
            </Link>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash me-2"></i>Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
