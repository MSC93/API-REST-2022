import express from "express";
import "dotenv/config";
import "./database/connectdb.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("😲😲😲 =>", origin);
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de CORS origin: " + origin + " No autorizado!");
    },
    credentials: true,
  })
);
app.set("port", process.env.PORT || 5001);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//solo ejemplo login/token
// app.use(express.static("public"));

// ejemplo back redirect (opcional)
app.use("/", redirectRouter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/links", linkRouter);

//test route
app.get("/", (req, res) => {
  res.send("<h1>OK 🔥🔥🔥</h1>");
});

export default app;
