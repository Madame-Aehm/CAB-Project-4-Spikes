import express from 'express'
import { getAllPets, getAllWithOwner } from '../controllers/pets.js'

const router = express.Router();

// router.get("/all", getAllPets);
router.get("/all", getAllWithOwner);

export default router