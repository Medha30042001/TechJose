import express from "express";
import "dotenv/config";
import { connectdb } from "./config/db.js";
import cors from 'cors';
import blogRoutes from "./routes/blog.routes.js";

const app = express();

connectdb();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Blog CRUD API is running");
});

app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    
})