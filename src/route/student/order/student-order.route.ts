import { Router } from "express";
import express from "express";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import {
  changeUserForTableName,
  isLoggedIn,
  restrictTo,
} from "../../../middleware/middleware";
import { UserRole } from "../../../middleware/type";
import { createStudentController } from "../../../controller/student/order/student-order.controller";
const router: Router = express.Router();

router
  .route("/order")
  .post(
    isLoggedIn,
    changeUserForTableName,
    restrictTo(UserRole.Student),
    asyncErrorHandler(createStudentController)
  );

export default router;
