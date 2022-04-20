import express from 'express';

const router = express.Router();

// * Import controller
import { getAllFeatures, getFeatures } from "../controllers/locationController";

// * Endpoint used to get all the features
router.get('/all', getAllFeatures);

// * Endpoint used to get all the features from one location

router.get('/:location', getFeatures);


export default router;