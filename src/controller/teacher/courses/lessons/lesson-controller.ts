import { Response } from "express";
import { IExtendedRequest } from "../../../../middleware/type";
import sequelize from "../../../../database/connection";
import { QueryTypes } from "sequelize";

const createLesson = async (req: IExtendedRequest, res: Response) => {
  const userId = req.user?.id;
  const instituteNumber = req.user?.currentInstituteNumber;
  const {
    lessonName,
    lessonDescription,
    lessonVideoUrl,
    lessonThumbnail,
    chapterId,
  } = req.body;
  if (
    !lessonName ||
    !lessonDescription ||
    !lessonThumbnail ||
    !lessonVideoUrl ||
    !chapterId
  ) {
    return res.status(400).json({
      message:
        "please provide lessonName, lessonDescription, lessonThumbnail, lessonVideoUrl, chapterId",
    });
  }

  await sequelize.query(
    `INSERT INTO chapter_lesson_${instituteNumber}( 
    lessonName,
    lessonDescription,
    lessonVideoUrl,
    lessonThumbnail,
    chapterId,)VALUES(?,?,?,?,?)`,
    {
      type: QueryTypes.INSERT,
      replacements: [
        lessonName,
        lessonDescription,
        lessonVideoUrl,
        lessonThumbnail,
        chapterId,
      ],
    }
  );

  res.status(200).json({
    message: "lesson added to chapters",
  });
};
const fetchLesson = async (req: IExtendedRequest, res: Response) => {
  const { chapterId } = req.params;
  const instituteNumber = req.user?.currentInstituteNumber;

  const data = await sequelize.query(
    `SELECT * FROM chapter_lesson_${instituteNumber}
    WHERE chapterId=?`,
    {
      type: QueryTypes.SELECT,
      replacements: [chapterId],
    }
  );

  res.status(200).json({
    message: "lesson fetched",
    data,
  });
};

export { createLesson, fetchLesson };
