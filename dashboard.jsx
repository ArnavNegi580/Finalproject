
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Dashboard({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/api/blogs/my");
      setBlogs(response.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/blogs/${id}`);

      setBlogs((previous) =>
        previous.filter((blog) => blog._id !== id)
      );
    } catch (error) {
      alert("Unable to delete blog.");
    }
  };

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p>Welcome, {user?.name}!</p>
        </div>

        <Link to="/create" className="primary-link">
          + Create Blog
        </Link>
      </div>

      <h2>My Published Blogs</h2>

      {loading && <p>Loading your blogs...</p>}

      {!loading && blogs.length === 0 && (
        <p>You haven't created any blogs yet.</p>
      )}

      <div className="blog-container">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 140)}...</p>

            <div className="dashboard-actions">
              <Link to={`/edit/${blog._id}`}>Edit</Link>

              <button onClick={() => deleteBlog(blog._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
