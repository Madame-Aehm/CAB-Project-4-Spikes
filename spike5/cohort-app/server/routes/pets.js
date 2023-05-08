import express from 'express'
import { getAllPets, getAllPetsPopulated } from '../controllers/pets.js'

const router = express.Router();

router.get("/all", getAllPets);
router.get("/all-populated", getAllPetsPopulated);

export default router