import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7890/BlogPersonalApp/blog/"
        );
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch posts");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="text-center">No blog posts available.</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-dark text-light">
                  By: <strong>{post.author}</strong>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <i>{post.title}</i>
                  </h5>
                  <p className="card-text">
                    {post.description.length > 100
                      ? `${post.description.substring(0, 20)}...`
                      : post.description}
                  </p>
                  <Link
                    to={`/blogs/${post._id}`}
                    className="btn btn-outline-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
