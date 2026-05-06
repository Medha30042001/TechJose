import { Link, NavLink } from "react-router-dom";
import { PenLine } from "lucide-react";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-slate-600 hover:text-blue-600";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <PenLine size={20} />
          </span>
          BlogSpace
        </Link>

        <div className="flex items-center gap-5">
          <NavLink to="/" className={linkClass}>
            Blogs
          </NavLink>

          <NavLink to="/create" className={linkClass}>
            Create
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;