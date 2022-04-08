import express from 'express';
const router = express.Router();

// * Controllers
import { signin, signup } from "../controllers/authController";

// * Middlewares
import { validateUserSchema } from '../middlewares/validateUserSchema';

/* TODO list:
 * - See all TODO comments
 * - Read documentation about refresh and access token (No me keda claro :)
 * - Create /refreshtoken endpoint
 * - We have to add roles?
 * - El refresh token se guarda en la db https://www.bezkoder.com/jwt-refresh-token-node-js-mongodb/
 */

// * Routes
// * Create new account
router.post("/signup", validateUserSchema, signup);

// * Login
router.post("/signin", validateUserSchema, signin);

export default router;





