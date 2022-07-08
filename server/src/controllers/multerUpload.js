import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname + "/../" + "controllers/" + "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const multerUpload = multer({ storage });

export default multerUpload;
