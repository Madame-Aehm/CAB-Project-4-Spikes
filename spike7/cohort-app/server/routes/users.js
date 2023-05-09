import express from 'express'
import { test, getProfile, getUserById, logIn, updateUser, registerUser, getAllUsers, getUserByEmail } from '../controllers/users.js';
import { multerUploads } from '../middlewares/multer.js';
import jwtAuth from '../middlewares/jwt.js';

const router = express.Router();

router.get("/testing", test);

router.get("/all", getAllUsers);
router.get("/id/:id", getUserById);
router.get("/email/:email", getUserByEmail);
router.get("/me", jwtAuth, getProfile);

router.post("/register", multerUploads.single("avatar"), registerUser);
router.post("/login", logIn);
router.post("/update", jwtAuth, multerUploads.single("avatar"), updateUser);













export default router