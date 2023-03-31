import express from 'express'
import { getScouts, getScoutById, getScoutsByName, getScoutByFullname, test, createScout, updateScout } from '../controllers/scouts.js'

const router = express.Router();

router.get("/testing", test);
router.get("/all", getScouts);
router.get("/id/:id", getScoutById);
router.get("/name/:name", getScoutsByName);
router.get("/fullname/:fname/:lname", getScoutByFullname);

router.post("/new", createScout);
router.post("/update/:id", updateScout);

export default router