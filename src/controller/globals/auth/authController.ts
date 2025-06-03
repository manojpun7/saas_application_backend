import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt";

//this is the functional controller
// const registerUser = async (req:Request,res:Response)=>{
//    const {username,password,email} = req.body
//    if(!username || !password || !email){
//      res.status(400).json({
//         message : "Please provide username, password, email"
//     })
//     return
//    }
//     // insert into Users table
//     await User.create({
//         username :username,
//         password : password,
//         email : email
//     })
//     res.status(200).json({
//         message : "User registered successfully"
//     })

// }

//class based controller

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      if (req.body === undefined) {
        console.log("no data sent !!!1");
      }
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        res.status(400).json({
          message: "Please provide username, password, email",
        });
        return;
      }

      await User.create({
        username: username,
        password: bcrypt.hashSync(password, 10),
        email: email,
      });
      res.status(200).json({
        message: "User registered successfully",
      });
    } catch (error) {
      console.log("error in register controller", error);
    }
  }
}

export default AuthController;

