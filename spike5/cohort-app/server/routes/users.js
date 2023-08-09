import express from 'express'
import { getAllUsers, getUserByEmail, getUserById, registerUser, test, updateUser } from '../controllers/users.js';
import { multerUploads } from '../utils/multer.js';

const router = express.Router();

router.get("/testing", test);
router.get("/all", getAllUsers);
router.get("/email/:email", getUserByEmail);
router.get("/id/:id", getUserById);

router.post("/register", multerUploads.single("avatar"), registerUser);
// router.post("/new", multerUploads.single("avatar"), createUser);
router.post("/update/:id", updateUser);


export default router