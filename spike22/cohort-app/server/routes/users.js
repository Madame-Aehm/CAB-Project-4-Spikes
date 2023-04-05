import express from 'express'
import { createUser, getUserById, updateUser } from '../controllers/users.js';
import { multerUploads } from '../utils/multer.js';

const router = express.Router();

router.get("/id/:id", getUserById);

router.post("/new", multerUploads.single("avatar"), createUser);
router.post("/update/:id", updateUser);
// router.post("/image", multerUploads.single("avatar"), userAvatar);

export default router