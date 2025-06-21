import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/institute/course/courseRoute";

app.use(express.json());

app.use("/api", authRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/institute/course", courseRoute);
export default app;
