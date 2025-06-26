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

import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateJwtToken from "../../../services/generateJwtToken";
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
          message: "Please provide please username, password, email",
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

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          message: "please provide all the credentials",
        });
        return;
      }
      const data = await User.findAll({
        where: {
          email: email,
        },
      });
      if (data.length == 0) {
        res.status(404).json({
          message: "not registered ",
        });
      } else {
        const isPasswordMatch = bcrypt.compareSync(password, data[0].password);
        if (isPasswordMatch) {
          const token = generateJwtToken({ id: data[0].id });
          res.json({
            token: token,
            message: "token generated successfully",
          });
        } else {
          res.status(403).json({
            message: "credential didnot match",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
      });
      console.log("error in loginUser controller", error);
    }
  }
}

export default AuthController;
