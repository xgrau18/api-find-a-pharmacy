import express from 'express';

const router = express.Router();

// * Import controller
import { getFeatures } from "../controllers/locationController";


router.get('/:location', getFeatures);


export default router;