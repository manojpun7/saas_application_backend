import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const instituteListForStudent = async (req: Request, res: Response) => {
  const tables = await sequelize.query(`SHOW TABLES LIKE 'institute_%'`, {
    type: QueryTypes.SHOWTABLES,
  });

  let allDatas = [];

  for (let table of tables) {
    const instituteNumber = table.split("_")[1];
    const [data] = await sequelize.query(
      `SELECT instituteName, institutePhoneNumber FROM  ${table}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    allDatas.push({ instituteNumber: instituteNumber, ...data });
  }

  res.status(200).json({
    message: "tables fetched! :",
    data: tables,
  });
};

const instituteCourseListForStudent = async (req: Request, res: Response) => {
  const { instituteId } = req.params;
  const datas = await sequelize.query(
    `SELECT co.id as courseId, co.courseName, co.courseDescription, co.coursePrice, cat.id as categoryId , cat.categoryName FROM course_${instituteId} AS co JOIN category_${instituteId} AS cat ON co.categoryId = cat.id`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (datas.length === 0) {
    res.status(404).json({
      message: "No courses found for this institute",
    });
  } else {
    res.status(200).json({
      message: "Coursed fetched",
      data: datas,
    });
  }
};
export { instituteListForStudent, instituteCourseListForStudent };
