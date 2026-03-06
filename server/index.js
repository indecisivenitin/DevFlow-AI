const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contact");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);



app.use(
  cors({
    origin: [
  "https://dev-flow-ai-six.vercel.app",
  "http://localhost:5173",
],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* -------------------- Middleware -------------------- */

app.use(express.json());
app.use(cookieParser());

/* -------------------- Routes -------------------- */

app.use("/api/auth", require("./routes/auth"));
app.use("/api/sessions", require("./routes/sessions"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/contact", contactRoutes);


app.get("/", (req, res) => {
  res.json({ success: true, message: "DevFlow API running " });
});


app.get('/ping', (req,res) => {
  res.json({ success: true, message: "Devflow is healthy " }); 
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });
