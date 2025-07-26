import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const createCategory = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const { categoryName, categoryDescription } = req.body;
  if (!categoryName || !categoryDescription) {
    return res.status(400).json({
      message: "Please provide categoryName, categoryDescription",
    });
  }
  await sequelize.query(
    `INSERT INTO category_${instituteNumber}(categoryName,categoryDescription) VALUES(?,?)`,
    {
      type: QueryTypes.INSERT,
      replacements: [categoryName, categoryDescription],
    }
  );

  const [CategoryData]: { id: string; createdAt: Date }[] =
    await sequelize.query(
      `SELECT id, createdAt from category_${instituteNumber} WHERE categoryName=?`,
      {
        replacements: [categoryName],
        type: QueryTypes.SELECT,
      }
    );

  res.status(200).json({
    message: "Category added successfully",
    data: {
      categoryName,
      categoryDescription,
      id: CategoryData.id,
      createdAt: CategoryData.createdAt,
    },
  });
};

const getCategories = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const categories = await sequelize.query(
    `SELECT * FROM category_${instituteNumber}`,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).json({
    message: "Categories fetched successfully",
    data: categories,
  });
};

const deleteCategory = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;
  const id = req.params.id;
  await sequelize.query(
    `DELETE FROM category_${instituteNumber} WHERE id = ?`,
    {
      type: QueryTypes.DELETE,
      replacements: [id],
    }
  );
  res.status(200).json({
    message: "Category deleted successfully",
  });
};

export { createCategory, getCategories, deleteCategory };
