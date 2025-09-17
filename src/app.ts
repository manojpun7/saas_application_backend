import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/institute/course/courseRoute";
import categoryRoute from "./route/institute/category/categoryRoute";
import teacherInstituteRoute from "./route/institute/teacher/teacherRoute";
import teacherRoute from "./route/teacher/teacher-route";
import studentRoute from "./route/student/institute/student-institute.route";
import chapterRoute from "./route/teacher/course/chapters/course-chapter-route";
import lessonRoute from "./route/teacher/course/lessons/lesson-route";
import studentCartRoute from "./route/student/cart/student-cart.route";
import studentOrderRoute from "./route/student/order/student-order.route";

import cors from "cors";

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
//global route
app.use("/api/auth", authRoute);

// institute routes
app.use("/api/institute/", instituteRoute);
app.use("/api/institute/course", courseRoute);
app.use("/api/institute/category", categoryRoute);
app.use("/api/institute/teacher", teacherInstituteRoute);

//teacher login routes
app.use("/api/teacher", teacherRoute);
app.use("/api/teacher/course", chapterRoute);
app.use("/api/teacher/course/", lessonRoute);

//student routes
app.use("/api/student/", studentRoute);
app.use("/api/student/", studentCartRoute);
app.use("/api/student/", studentOrderRoute);


export default app;
