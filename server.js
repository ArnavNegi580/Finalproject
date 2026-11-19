
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL?.split(",") || "http://localhost:5173"
}));

app.use(express.json({ limit: "1mb" }));

connectDB();

app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/blogs", require("./Routes/blogRoutes"));

app.get("/", (req, res) => {
  res.send("Blog Application API is running successfully!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
