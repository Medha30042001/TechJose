import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : [true, "Blog title is required"],
            trim : true,
        },
        content : {
            type : String,
            required : [true, "Blog content is required"],
        },
        category : {
            type : String,
            required : [true, 'Blog category is required'],
            trim : true,
        },
        author : {
            type : String,
            default : "Anonymous Writer",
            trim : true,
        },
        coverImage : {
            type : String,
            default : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
        },
    },
    {
        timestamps : true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;