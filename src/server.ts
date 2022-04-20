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
import router from './routes/auth';
import locations from './routes/locations';

// * Allow cors petitions
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// * Middlewares
import { verifyToken } from './middlewares/authJwt'
app.use(express.json());
app.use(morgan('dev'));

/*
*  TODO list:
*   - Solve problem related with @ts-ignore
* */

// * Testing endpoint
app.get("/", verifyToken, (req: Request, res: Response) => {
    res.status(200).send("I'm working!");
});

// * Routes
app.use("/auth", auth);

app.use("/locations", locations);


// * Database and start server
initDatabase(config.PORT, config.URI, app);


