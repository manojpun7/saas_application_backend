import express, { Request, Router } from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
} from "../../../controller/institute/course/courseController";
import multer from "multer";
import { storage } from "../../../services/cloudinaryConfig";

//this is the local configuration of multer
// import {multer, storage} from './../../../middleware/multerMiddleware'
// const upload = multer({storage: storage})

const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("image matra support garxa hai"));
    }
  },
});

const router: Router = express.Router();

router
  .route("/")
  .post(
    isLoggedIn,
    upload.single("courseThumbnail"),
    asyncErrorHandler(createCourse)
  )
  .get(isLoggedIn, asyncErrorHandler(getAllCourse));

router
  .route("/:id")
  .get(asyncErrorHandler(getSingleCourse))
  .delete(isLoggedIn, asyncErrorHandler(deleteCourse));

export default router;
