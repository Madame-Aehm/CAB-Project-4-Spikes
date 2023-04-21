import express from 'express'
import { createUser, getUserById, logIn, updateUser } from '../controllers/users.js';
import { multerUploads } from '../middlewares/multer.js';
import jwtAuth from '../middlewares/jwt.js';

const router = express.Router();

router.post("/new", multerUploads.single("avatar"), createUser);
router.post("/login", logIn);

router.get("/profile/:id", jwtAuth, getUserById);
router.post("/update/:id", updateUser);





export default router