import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Pencil, Tag, Trash2, User } from "lucide-react";
import API from "../api/api";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/blogs/${id}`);

      setBlog(res.data.blog);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch blog details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/blogs/${id}`);

      alert("Blog deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 text-center text-slate-600">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Blog not found</h1>

        <Link to="/" className="mt-4 inline-block text-blue-600">
          Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Blogs
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-80 w-full object-cover"
          />

          <div className="p-6 md:p-8">
            <div className="mb-5 flex flex-wrap gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1 text-blue-600">
                <Tag size={16} />
                <span>{blog.category}</span>
              </div>

              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{blog.author}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                {blog.title}
              </h1>

              <div className="flex gap-3">
                <Link
                  to={`/edit/${blog._id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
                >
                  <Pencil size={16} />
                  Edit
                </Link>

                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            <div className="whitespace-pre-line text-lg leading-8 text-slate-700">
              {blog.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;