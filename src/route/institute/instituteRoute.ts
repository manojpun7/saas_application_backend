

import express, { Router } from "express"
import createInstitute from "../../controller/institute/instituteController"
import isLoggedIn from "../../middleware/middleware"

const router:Router = express.Router()

router.route("/").post(isLoggedIn, createInstitute)


export default router
