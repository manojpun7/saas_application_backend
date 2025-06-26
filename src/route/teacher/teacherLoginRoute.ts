


import express,{Router} from 'express'
import asyncErrorHandler from '../../services/asyncErrorHandler';
import { teacherLogin } from '../../controller/teacher/teacherLoginController';
const router:Router = express.Router()

router.route("/").post(asyncErrorHandler(teacherLogin))

export default router;