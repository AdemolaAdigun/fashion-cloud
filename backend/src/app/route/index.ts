import {Router} from "express";
import product from "./product";

// Initialize the main router
const routes = Router();

// Mount the product router on the "/products" path
routes.use('/products', product);

// Export the configured main router
export default routes;
