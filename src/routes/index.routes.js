import {Router} from 'express'
import {pool} from '../db.js'
import { getindex } from '../controllers/index.controller.js';

const router = Router()

router.get("/ping", getindex);

export default router;