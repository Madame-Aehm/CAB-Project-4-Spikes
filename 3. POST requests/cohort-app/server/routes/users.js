import express from 'express'
import { getAllUsers, getUserByEmail, registerUser, test } from '../controllers/users.js';

const router = express.Router();

router.get("/testing", test);
router.get("/all", getAllUsers);
router.get("/email/:email", getUserByEmail);

router.post("/register", registerUser);

export default router