import express from 'express'
import { createUser, getProfile, getUserById, logIn, updateUser } from '../controllers/users.js';
import { multerUploads } from '../middlewares/multer.js';
import jwtAuth from '../middlewares/jwt.js';

const router = express.Router();

router.get("/user/:id", getUserById);
router.get("/me", jwtAuth, getProfile);

router.post("/new", multerUploads.single("avatar"), createUser);
router.post("/login", logIn);
router.post("/update/:id", updateUser);







export default router