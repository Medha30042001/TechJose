import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Technology",
    author: "",
    coverImage: "",
  });

  const [loading, setLoading] = useState(false);

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

      await API.post("/blogs", formData);

      alert("Blog created successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Blog</h1>

        <p className="mt-2 text-slate-600">
          Add a new blog post to your MongoDB database.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
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
              placeholder="Example: Medha"
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
              placeholder="Paste image URL"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="mt-1 text-sm text-slate-500">
              Optional. A default image will be used if left empty.
            </p>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Blog Content
            </label>

            <textarea
              name="content"
              rows="10"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={handleChange}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;