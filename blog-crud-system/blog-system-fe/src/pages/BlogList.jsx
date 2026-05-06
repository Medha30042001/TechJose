import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import API from "../api/api";
import BlogCard from "../components/BlogCard";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (customSearch = search, customCategory = category) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (customSearch) params.append("search", customSearch);
      if (customCategory && customCategory !== "All") {
        params.append("category", customCategory);
      }

      const res = await API.get(`/blogs?${params.toString()}`);

      setBlogs(res.data.blogs);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs("", "All");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  const handleClear = () => {
    setSearch("");
    setCategory("All");
    fetchBlogs("", "All");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-3xl bg-gradient-to-r from-slate-950 to-blue-900 px-6 py-10 text-white shadow-lg md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-200">
                BlogSpace
              </p>

              <h1 className="text-3xl font-bold md:text-5xl">
                Share your thoughts with the world.
              </h1>

              <p className="mt-4 max-w-2xl text-slate-200">
                Create, read, update, delete, search, and filter blogs.
              </p>
            </div>

            <Link
              to="/create"
              className="flex w-fit items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-blue-50"
            >
              <Plus size={18} />
              Create Blog
            </Link>
          </div>
        </section>

        <form
          onSubmit={handleSearch}
          className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_220px_auto_auto]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by title, content, or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Entertainment">Entertainment</option>
            </select>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Search
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Clear
            </button>
          </div>
        </form>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              No blogs found
            </h2>
            <p className="mt-2 text-slate-600">
              Try changing your search or create your first blog.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;