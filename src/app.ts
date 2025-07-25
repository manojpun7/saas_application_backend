import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/institute/course/courseRoute";
import categoryRoute from "./route/institute/category/categoryRoute";
import teacherRoute from "./route/institute/teacher/teacherRoute";
import teacherLoginRoute from "./route/teacher/teacherLoginRoute";
import cors from 'cors'

app.use(express.json())

app.use(cors({
    origin : "http://localhost:3000"
}))

app.use(express.json());
//global route
app.use("/api/auth", authRoute);

// institute routes
app.use("/api/institute/", instituteRoute);
app.use("/api/institute/course", courseRoute);
app.use("/api/institute/category", categoryRoute);
app.use("/api/institute/teacher", teacherRoute);

//teacher login routes
app.use("/api/teacher", teacherLoginRoute);

export default app;
