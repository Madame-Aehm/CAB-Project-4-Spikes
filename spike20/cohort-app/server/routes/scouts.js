import express from 'express'
import { test } from '../controllers/scouts.js'

const router = express.Router();

router.get("/testing", test);

export default router