import express, { Router } from "express";
import { isLoggedIn, restrictTo } from "../../../../middleware/middleware";
import asyncErrorHandler from "../../../../services/asyncErrorHandler";
import { UserRole } from "../../../../middleware/type";
import { addChapterToCourse } from "../../../../controller/teacher/courses/chapters/chapter-controller";

const router: Router = express.Router();

router
  .route("/course/:courseId/chapters/")
  .post(
    isLoggedIn,
    restrictTo(UserRole.Teacher),
    asyncErrorHandler(addChapterToCourse)
  );
