import express from 'express';
import { resolve } from 'path';
import { app } from '../server';

import { mataro_ph } from "../controllers/locationsController";

const router = express.Router();

//app.use('/mataro',router);
// * Import controller

router.get("/mataro",mataro_ph);

export default router;