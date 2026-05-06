import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import EditBlog from "./pages/EditBlog.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;