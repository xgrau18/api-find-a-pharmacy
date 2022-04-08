import express, { Request, Response} from 'express';
export const app = express();

// * Connection file
import { initDatabase } from "./connection";

// * Import config file
import { config } from "./config/config";

// * Import routes file
import auth from './routes/auth';

// * Petition Debugger
import morgan from 'morgan';

// * Middlewares
app.use(express.json());
app.use(morgan('dev'));

import { verifyToken } from './middlewares/authJwt'

// * Testing endpoint
app.get("/", verifyToken, (req: Request, res: Response) => {
    res.status(200).send("Funciono");
});

// * Routes
app.use("/auth", auth);



// * Database and start server
initDatabase(config.PORT, config.URI, app);