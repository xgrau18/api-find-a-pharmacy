import mongoose from "mongoose";

// TODO: Try to find which type is app variable
export function initDatabase(PORT: number, URI: string, app: any) {

    mongoose.connect(URI);

    mongoose.connection.on('error', (err) => {
        console.log(`Error connecting to database: ${err}`);
    });

    mongoose.connection.on('connected', () => {
        console.log("Successfully connected to the database");
        startServer(PORT, app);
    });

}

function startServer(PORT: number, app: any) {

    app.listen(PORT, () => {
        console.log( `server started at http://localhost:${ PORT }` );
    }).on('error', (err: string) => {
        console.log(`Error starting server: ${err}`);
    });

}
