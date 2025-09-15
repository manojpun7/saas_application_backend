import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import User from "../../../database/models/userModel";
import { QueryTypes } from "sequelize";

const createStudentController = async (
  req: IExtendedRequest,
  res: Response
) => {
  const userId = req.user?.id;
  const userData = await User.findByPk(userId);
  const { whatsapp_no, remarks } = req.body;

  const orderDetailsData: { courseId: string; instituteId: string }[] =
    req.body;

  if (orderDetailsData.length === 0)
    return res.status(400).json({
      message: "please provide order details data",
    });

  if (!whatsapp_no || !remarks) {
    return res.status(400).json({
      message: "please provide whatsapp number and remarks",
    });
  }

  //student orders
  await sequelize.query(`CREATE TABLE IF NOT EXISTS student_order_${userId}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        email VARCHAR(25) NOT NULL,
        whatsapp_no VARCHAR(26) NOT NULL, 
        remarks TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        )`);

  //order -details
  await sequelize.query(`CREATE TABLE IF NOT EXISTS student_order_details_${userId}(
        
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        courseId VARCHAR(36),
        instituteId VARCHAR(36),
        orderId VARCHAR(26) REFERENCES student_order_${userId} NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        
        )`);

  await sequelize.query(`CREATE TABLE IF NOT EXISTS student_payment_${userId}(
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        paymentMethod ENUM('esewa','khalti','cod'),
        paymentStatus ENUM('paid','pending', 'unpaid'),
        totalAmount VARCHAR(10) NOT NULL,
        orderId VARCHAR(26) REFERENCES student_order_${userId} NOT NULL,

        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        
        )`);

  //insert query

  const data = await sequelize.query(
    `INSERT INTO student student_order_${userId}(whatsapp_no,email,remarks)
            VALUES(?,?,?)`,
    {
      type: QueryTypes.INSERT,
      replacements: [whatsapp_no, remarks, userData?.email],
    }
  );
  console.log(data, "from insert query of order");
  //yo loop chai multiple order aayo vane !!!
  for (let orderDetail of orderDetailsData) {
    await sequelize.query(
      `INSERT INTO student_order_details_${userId}(courseId,instituteId,orderId) VALUES(?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [orderDetail.courseId, orderDetail.instituteId, 12345], // 12345 dummy values for now
      }
    );
  }
};
