import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const insertIntoCartTableOfStudent = async (
  req: IExtendedRequest,
  res: Response
) => {
  const userId = req.user?.id;
  const { instituteId, courseId } = req.body;

  if (!instituteId) {
    return res.status(400).json({
      message: "please provide institute ID",
    });
  }
  await sequelize.query(`CREATE TABLE IF NOT EXISTS student_cart_${userId}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        courseId VARCHAR(36) REFERENCES course_${instituteId}(id), 
        instituteId VARCHAR(36) REFERENCES institute_${instituteId}(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        )`);
  await sequelize.query(
    `INSERT INTO student_cart_${userId}(courseId, instituteId) VALUES(?, ?)`,
    {
      type: QueryTypes.INSERT,
      replacements: [courseId, instituteId],
    }
  );
  res.status(200).json({
    message: "course added to cart successfully",
  });
};

const fetchStudentCartItems = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  let cartDatas = [];
  const datas: { instituteId: string; courseId: string }[] =
    await sequelize.query(
      `SELECT courseId , instituteId FROM student_cart_${userId}`,
      {
        type: QueryTypes.SELECT,
      }
    );

  for (let data of datas) {
    const [cartItem] = await sequelize.query(
      `SELECT * FROM course_${data.instituteId} WHERE id = '${data.courseId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    cartDatas.push({ ...cartItem });
  }

  if (datas.length === 0) {
    res.status(404).json({
      message: "no item in the cart",
    });
  } else {
    res.status(200).json({
      message: "cart items fetched",
      data: cartDatas,
    });
  }
};

export { fetchStudentCartItems, insertIntoCartTableOfStudent };
