import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import { IExtendedRequest } from "../../middleware/type";
import categories from "../../seed";
import generateRandomInsituteNumber from "../../services/generateRandomInstituteNumber";
import User from "../../database/models/userModel";

const createInstitute = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {

  const {
    instituteName,
    instituteEmail,
    institutePhoneNumber,
    instituteAddress,
  } = req.body;
  const instituteVatNo = req.body.instituteVatNo || null;
  const institutePanNo = req.body.institutePanNo || null;
  if (
    !instituteName ||
    !instituteEmail ||
    !institutePhoneNumber ||
    !instituteAddress
  ) {
    res.status(400).json({
      message:
        "Please provide instituteName,instituteEmail, institutePhoneNumber,  instituteAddress ",
    });
    return;
  }
 

  const instituteNumber = generateRandomInsituteNumber();
  await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
            id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
            instituteName VARCHAR(255) NOT NULL, 
            instituteEmail VARCHAR(255) NOT NULL , 
            institutePhoneNumber VARCHAR(255) NOT NULL , 
            instituteAddress VARCHAR(255) NOT NULL, 
            institutePanNo VARCHAR(255), 
            instituteVatNo VARCHAR(255), 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`);

  await sequelize.query(
    `INSERT INTO institute_${instituteNumber}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo,instituteVatNo) VALUES(?,?,?,?,?,?)`,
    {
      replacements: [
        instituteName,
        instituteEmail,
        institutePhoneNumber,
        instituteAddress,
        institutePanNo,
        instituteVatNo,
      ],
    }
  );
  //
  // to create user_institute history table jaha chai users le k k institute haru create garyo sabai ko number basnu paryo
  await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
            userId VARCHAR(255) REFERENCES users(id), 
            instituteNumber INT UNIQUE 
            )`);

  if (req.user) {
    await sequelize.query(
      `INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,
      {
        replacements: [req.user.id, instituteNumber],
      }
    );

    await User.update(
      {
        currentInstituteNumber: instituteNumber,
        role: "institute",
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
  }

  if (req.user) {
    req.user.currentInstituteNumber = instituteNumber;
  }
  next();
};

const createTeacherTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
               id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()), 
              teacherName VARCHAR(255) NOT NULL, 
              teacherEmail VARCHAR(255) NOT NULL UNIQUE, 
              teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
              teacherExpertise VARCHAR(255), 
              joinedDate DATE, 
              salary VARCHAR(100),
              createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
              updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
              )`);
  next();
};

const createStudentTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const instituteNumber = req.user?.currentInstituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
             id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
            studentName VARCHAR(255) NOT NULL, 
            studentPhoneNo VARCHAR(255) NOT NULL UNIQUE, 
            studentAddress TEXT, 
            enrolledDate DATE, 
            studentImage VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
            )`);
    next();
  } catch (error) {
    console.log(error, "Error");
    res.status(500).json({
      message: error,
    });
  }
};

const createCourseTable = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        courseName VARCHAR(255) NOT NULL UNIQUE, 
        coursePrice VARCHAR(255) NOT NULL, 
        courseDuration VARCHAR(100) NOT NULL, 
        courseLevel ENUM('beginner','intermediate','advance') NOT NULL, 
        courseThumbnail VARCHAR(200),
        courseDescription TEXT, 
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

  res.status(200).json({
    message: "Institute created vayoo!!!",
    instituteNumber,
  });
};



export {
  createInstitute,
  createTeacherTable,
  createStudentTable,
  createCourseTable,
};
