import express, { Request, Response} from 'express';
import {Router} from 'express';
export const app = express();

// * Connection file
import { initDatabase } from "./connection";

// * Import config file
import { config } from "./config/config";

// * Import routes file
import auth from './routes/auth';

// * Petition Debugger
import morgan from 'morgan';
import router from './routes/auth';
import locations from './routes/locations';



// * Middlewares
app.use(express.json());
app.use(morgan('dev'));

// * Testing endpoint
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Funciono");
});

// * Routes
app.use("/auth", auth);

app.use("/",locations);



// * Database and start server
initDatabase(config.PORT, config.URI, app);

//Routes


