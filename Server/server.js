const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const bookRoutes = require("./routes/bookRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const fineRoutes = require("./routes/fineRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173", // Allow frontend origin
  methods: "GET,POST,PUT,DELETE",  // Allowed HTTP methods
  credentials: true,               // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/fines", fineRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));

