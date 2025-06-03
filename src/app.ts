import express from "express"
const app = express()
import AuthController from "./controller/globals/auth/authController"
app.use(express.json());

app.use("/api",AuthController.registerUser)



export default app