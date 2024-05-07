import express from 'express'
import { getScouts, getScoutById, getScoutsByName, test } from '../controllers/scouts.js'

const router = express.Router();

router.get("/testing", test);
router.get("/all", getScouts);
router.get("/id/:id", getScoutById);
router.get("/name/:name", getScoutsByName);

export default router