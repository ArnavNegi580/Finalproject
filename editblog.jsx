
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/api/blogs/${id}`);
        const blog = response.data;

        if (String(blog.author?._id || blog.author) !==
            String(JSON.parse(localStorage.getItem("user"))?.id)) {
          alert("You cannot edit this blog.");
          navigate("/dashboard");
          return;
        }

        setTitle(blog.title);
        setContent(blog.content);
      } catch (error) {
        alert("Unable to find blog.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/blogs/${id}`, {
        title,
        content
      });

      alert("Blog updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  if (loading) return <p className="container">Loading...</p>;

  return (
    <div className="auth-container">
      <form className="auth-form blog-form" onSubmit={handleSubmit}>
        <h2>Edit Blog</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          required
        />

        <button>Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
