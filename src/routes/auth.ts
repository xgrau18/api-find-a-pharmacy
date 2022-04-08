import express from 'express';
const router = express.Router();

// * Controllers
import { signin, signup } from "../controllers/authController";

// * Middlewares
import { validateUserSchema } from '../middlewares/validateUserSchema';

// * Routes
// * Create new account
router.post("/signup", validateUserSchema, signup);

// * Login
router.post("/signin", validateUserSchema, signin);

export default router;





