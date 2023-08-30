import {Router} from "express";
import routesController from "../controller/product";

// Initialize the router
const routes = Router();

const {
    getProducts,
    createProduct,
    updateProductById,
    deleteProductById
} = routesController;

// Define API routes and their respective handlers

// Retrieve all products
routes.get('/', getProducts);

// Create a new product
routes.post('/', createProduct);

// Update a specific product by its ID
routes.patch('/:id', updateProductById);

// Delete a specific product by its ID
routes.delete('/:id', deleteProductById);

export default routes;
