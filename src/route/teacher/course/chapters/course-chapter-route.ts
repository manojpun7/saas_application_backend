import express, { Router }  from "express"
import isLoggedIn from "../../../../middleware/middleware"

const router:Router = express.Router()

router.route('/course/:courseId/chapters/').post(isLoggedIn)