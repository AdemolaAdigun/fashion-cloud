import * as express from 'express';
import { connectToDatabase } from './db-connector';
import Config from './config';
import routes from "./route/index";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

async function start() {
    const { MONGO_URL, FASHION_CLOUD_DB, SERVICE_PORT } = Config;

    // Connect to the database
    try {
        await connectToDatabase(`${MONGO_URL}${FASHION_CLOUD_DB}`);
    } catch (err) {
        console.error("Failed to connect to the database", err);
        process.exit(1);  // Exit the process with an error code
    }

    app.get('/', (req, res) => {
        res.send('Welcome to Fashion Cloud!');
    });

    // Start the server
    app.listen(SERVICE_PORT, () => {
        console.log(`Server running on http://localhost:${SERVICE_PORT}`);
    });
}

export default {
    start
};
