import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Set storage destination and filename
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "src/uploads/avatars"); // store in this folder
  },
  filename: function (_req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext); // unique filename
  },
});

// File type validation
const fileFilter = (_req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
  }
};

export const upload = multer({ storage, fileFilter });
