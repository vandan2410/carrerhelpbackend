import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouter from "./routes/user.js";
import PostRouter from "./routes/post.js";
import CompanyRouter from './routes/company.js'

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/company",CompanyRouter)

app.listen(5000, async () => {
  console.log("server is running on port 5000");
});
