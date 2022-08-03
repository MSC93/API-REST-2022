import express from "express";
import "dotenv/config";
import "./database/connectdb.js";
// import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.set("port", process.env.PORT || 5001);
// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//solo ejemplo login/token
app.use(express.static("public"));

app.use("/api/v1/auth", authRoutes);

//test route
app.get("/", (req, res) => {
  res.send("<h1>OK 🔥🔥🔥</h1>");
});

export default app;
