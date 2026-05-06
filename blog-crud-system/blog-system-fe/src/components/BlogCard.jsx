import { Link } from "react-router-dom";
import { Calendar, User, Tag } from "lucide-react";

const BlogCard = ({ blog }) => {
  const preview =
    blog.content.length > 130
      ? blog.content.substring(0, 130) + "..."
      : blog.content;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
          <Tag size={16} />
          <span>{blog.category}</span>
        </div>

        <h2 className="mb-2 line-clamp-2 text-xl font-bold text-slate-900">
          {blog.title}
        </h2>

        <p className="mb-4 text-sm leading-6 text-slate-600">{preview}</p>

        <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <User size={15} />
            <span>{blog.author}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar size={15} />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <Link
          to={`/blogs/${blog._id}`}
          className="inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;