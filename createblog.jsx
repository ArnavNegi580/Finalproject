
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/blogs", {
        title,
        content
      });

      alert("Blog created successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to create blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form blog-form" onSubmit={handleSubmit}>
        <h2>Create New Blog</h2>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          required
        />

        <button disabled={loading}>
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
