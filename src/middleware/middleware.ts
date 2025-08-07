import { NextFunction, Response } from "express";
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
        attributes: ["id", "currentInstituteNumber", "role"],
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

const restrictTo = (role: string) => {
  return (req: IExtendedRequest, res: Response, next: NextFunction) => {
    let userRole = req.user?.role;

    if (userRole === role) {
      next();
    } else {
      res.status(403).json({
        message: "invalid, unauthorized access !",
      });
    }
  };
};

export { isLoggedIn, restrictTo };
