import multer from "multer";


// locally storage ko lagi
const storage = multer.diskStorage({
  //location incomming file kata rakne vanne ho
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "./src/storage");
  },
  //mathi ko location deko ma rakey paxi , k name ma rakne vanne ho
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now()+ "-"+file.originalname)
  },
});

export default { multer, storage };
