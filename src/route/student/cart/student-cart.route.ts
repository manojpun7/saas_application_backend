import { Router } from "express";
import express from "express";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import {
  fetchStudentCartItems,
  insertIntoCartTableOfStudent,
  removeStudentCartItems,
} from "../../../controller/student/cart/student-cart-controller";
import {
  changeUserForTableName,
  isLoggedIn,
  restrictTo,
} from "../../../middleware/middleware";
import { UserRole } from "../../../middleware/type";

const router: Router = express.Router();

router
  .route("/cart")
  .post(
    isLoggedIn,
    changeUserForTableName,
    restrictTo(UserRole.Student),
    asyncErrorHandler(insertIntoCartTableOfStudent)
  );
router
  .route("/cart")
  .get(
    isLoggedIn,
    changeUserForTableName,
    restrictTo(UserRole.Student),
    asyncErrorHandler(fetchStudentCartItems)
  );

  router.route("/cart/:id").delete(isLoggedIn, restrictTo(UserRole.Student),asyncErrorHandler(removeStudentCartItems))

export default router;
