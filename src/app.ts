import express from "express"
const app = express()
import AuthController from "./controller/globals/auth/authController"
app.use(express.json());

app.use("/api/register",AuthController.registerUser)
app.use("/api/login",AuthController.loginUser)



export default app