import express from 'express'
import { getAllUsers, searchSingleUser, test } from '../controllers/users.js';

const router = express.Router();

router.get("/testing", test);
router.get("/all", getAllUsers);
router.get("/email/:email", searchSingleUser);
// router.get("/id/:id", getScoutById);
// router.get("/name/:name", getScoutsByName);

export default router