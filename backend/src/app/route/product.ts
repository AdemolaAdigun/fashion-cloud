import {Router} from "express";
import routesController from "../controller/product";
const routes = Router();

const { getProducts, createProduct, updateProductById,
    deleteProductById } = routesController;

routes.get('/', getProducts);
routes.post('/', createProduct);
routes.patch('/:id', updateProductById);
routes.delete('/:id', deleteProductById);

export default routes;