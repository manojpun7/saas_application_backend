import express, { Router } from "express";
import { isLoggedIn, restrictTo } from "../../../../middleware/middleware";
import asyncErrorHandler from "../../../../services/asyncErrorHandler";
import { UserRole } from "../../../../middleware/type";
import { addChapterToCourse } from "../../../../controller/teacher/courses/chapters/chapter-controller";
import {
  createLesson,
  fetchLesson,
} from "../../../../controller/teacher/courses/lessons/lesson-controller";

const router: Router = express.Router();

router
  .route("/:chapterId/lessons")
  .post(
    isLoggedIn,
    restrictTo(UserRole.Teacher),
    asyncErrorHandler(createLesson)
  )
  .get(
    isLoggedIn,
    restrictTo(UserRole.Teacher),
    asyncErrorHandler(fetchLesson)
  );

export default router;
