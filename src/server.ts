import express, { Request, Response} from 'express';
export const app = express();

// * Connection file
import { initDatabase } from "./connection";

// * Import config file
import { config } from "./config/config";

// * Petition Debugger
import morgan from 'morgan';

// * Middlewares
app.use(express.json());
app.use(morgan('dev'));

// * Testing endpoint
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Funciono");
});

// * Routes



// * Database and start server
initDatabase(config.PORT, config.URI, app);