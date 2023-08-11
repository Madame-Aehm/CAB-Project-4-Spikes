import express from 'express'
import { getAllUsers, getUserByEmail, getUserById, logIn, registerUser, test, updateUser, updateUserAndPet } from '../controllers/users.js';
import { multerUploads } from '../utils/multer.js';

const router = express.Router();

router.get("/testing", test);
router.get("/all", getAllUsers);
router.get("/email/:email", getUserByEmail);
router.get("/id/:id", getUserById);

router.post("/register", multerUploads.single("avatar"), registerUser);
router.post("/login", logIn);
router.post("/update/:id", updateUser);
router.post("/update-both/:userID", updateUserAndPet);


export default router