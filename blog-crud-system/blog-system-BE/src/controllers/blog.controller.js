import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
    try {
        const {title, content, category, author, coverImage} = req.body;

        if(!title || !content || !category) {
            return res.status(400).json({
                success : false,
                message : "Title, content, and category are required",
            });
        }

        const blog = await Blog.create({
            title,
            content, 
            category,
            author : author || "Anonymous Writer",
            coverImage,
        });

        res.status(201).json({
            success : true, 
            message : "Blog created successfully",
            blog,
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            mesage : "Failed to create blog",
            error : error.message,
        });
    }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { search, category } = req.query;

    console.log("REQ QUERY:", req.query);

    const query = {};

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");

      query.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { author: searchRegex },
        { category: searchRegex },
      ];
    }

    if (category && category !== "All" && category.trim() !== "") {
      query.category = new RegExp(category.trim(), "i");
    }

    console.log("MONGODB QUERY:", query);

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("GET ALL BLOGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if(!blog) {
            return res.status(404).json({
                success : false,
                message : "blog not found",
            });
        }

        res.status(200).json({
            sucess : true,
            blog,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Failed to fetch blog",
            error : error.message,
        });
    }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, author, coverImage } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.title = title;
    blog.content = content;
    blog.category = category;
    blog.author = author || "Anonymous Writer";

    if (coverImage && coverImage.trim() !== "") {
      blog.coverImage = coverImage;
    }

    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update blog",
      error: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteBlog = await Blog.findByIdAndDelete(id);

        if(!deleteBlog) {
            return res.status(400).json({
                success : false,
                message : "Blog not found",
            });
        }

        res.status(200).json({
            success : true,
            message : "Blog deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Failed to delete blog",
            error : error.message,
        })
    }
};