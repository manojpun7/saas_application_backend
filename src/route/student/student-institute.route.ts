import { Router} from "express";
import express from 'express'
import asyncErrorHandler from "../../services/asyncErrorHandler";
import {instituteCourseListForStudent, instituteListForStudent} from "../../controller/student/institute/student-institute.controller";



const router: Router = express.Router()

router.route("/institute").get(asyncErrorHandler(instituteListForStudent))
router.route("/institute/:instituteId/courses").get(asyncErrorHandler(instituteCourseListForStudent))

export default router