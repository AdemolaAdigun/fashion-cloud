import * as express from 'express';
import { connectToDatabase } from './config/db-connector';
import Config from './config/envConfig';
import routes from "./route/index";
import * as cors from 'cors';

const app = express();

// Set up middlewares

// Enable CORS for all routes
app.use(cors());

// Parse incoming request bodies in a middleware
app.use(express.urlencoded({ extended: false }));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Set up API routes
app.use(routes);

async function start() {
    const { MONGO_URL, FASHION_CLOUD_DB, SERVICE_PORT } = Config;

    // Attempt to establish a connection to the database
    try {
        await connectToDatabase(`${MONGO_URL}${FASHION_CLOUD_DB}`);
    } catch (err) {
        console.error("Failed to connect to the database", err);
        process.exit(1);  // Terminate the application if database connection fails
    }

    // Default route
    app.get('/', (req, res) => {
        res.send('Welcome to Fashion Cloud!');
    });

    // Start the express server
    app.listen(SERVICE_PORT, () => {
        console.log(`Server running on http://localhost:${SERVICE_PORT}`);
    });
}

export default {
    start
};
