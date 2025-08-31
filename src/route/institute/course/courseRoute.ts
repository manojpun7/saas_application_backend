import express, { Request, Router } from "express";
import { isLoggedIn, restrictTo } from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
} from "../../../controller/institute/course/courseController";
import upload from "../../../middleware/multerUpload";
import { UserRole } from "../../../middleware/type";

const router: Router = express.Router();

router
  .route("/")
  .post(
    isLoggedIn,
    restrictTo(UserRole.Institute),
    upload.single("courseThumbnail"),
    asyncErrorHandler(createCourse)
  )
  .get(isLoggedIn, asyncErrorHandler(getAllCourse));

router
  .route("/:id")
  .get(asyncErrorHandler(getSingleCourse))
  .delete(
    isLoggedIn,
    restrictTo(UserRole.Institute, UserRole.Teacher),
    asyncErrorHandler(deleteCourse)
  );

export default router;
