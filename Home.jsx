
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        setError("Unable to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <span className="hero-tag">WELCOME TO BLOGSPACE</span>
        <h1>Every Story Deserves To Be Heard.</h1>
        <p>
          Share your ideas, experiences and knowledge
          with the world.
        </p>
        <Link to="/register" className="primary-link">
          Start Writing
        </Link>
      </section>

      <section className="blogs-section">
        <h2>Latest Stories</h2>

        {loading && <p>Loading blogs...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && blogs.length === 0 && (
          <p>No blogs published yet. Be the first to write!</p>
        )}

        <div className="blog-container">
          {blogs.map((blog) => (
            <article className="blog-card" key={blog._id}>
              <span className="blog-label">BLOG POST</span>
              <h3>{blog.title}</h3>

              <p>
                {blog.content.length > 150
                  ? blog.content.substring(0, 150) + "..."
                  : blog.content}
              </p>

              <small>
                By {blog.author?.name || "Unknown"}
              </small>

              <div className="blog-date">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
