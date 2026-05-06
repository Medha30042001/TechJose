import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Technology",
    author: "",
    coverImage: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);

      const blog = res.data.blog;

      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        category: blog.category || "Technology",
        author: blog.author || "",
        coverImage: blog.coverImage || "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to fetch blog");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      alert("Title, content, and category are required");
      return;
    }

    try {
      setLoading(true);

      await API.put(`/blogs/${id}`, formData);

      alert("Blog updated successfully");
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Edit Blog</h1>

        <p className="mt-2 text-slate-600">
          Update your blog post details.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Author Name
            </label>

            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Cover Image URL
            </label>

            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Blog Content
            </label>

            <textarea
              name="content"
              rows="10"
              value={formData.content}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-300"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;