import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel";

import { IExtendedRequest } from "../middleware/type";

const isLoggedIn = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      message: "please provide token",
    });
    return;
  }

  jwt.verify(token, "secrettoken", async (erroraayo, resultaayo: any) => {
    if (erroraayo) {
      res.status(403).json({
        message: "Token invalid ",
      });
    } else {
      const userData = await User.findByPk(resultaayo.id, {
        attributes: ["id", "currentInstituteNumber"],
      });
      if (!userData) {
        res.status(403).json({
          message: "No user with that id, invalid token ",
        });
      } else {
        req.user = userData;
        next();
      }
    }
  });
};

export default isLoggedIn;
