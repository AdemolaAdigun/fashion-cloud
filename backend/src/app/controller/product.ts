import { Request, Response } from 'express';
import Product from "../model/product";
import { handleError, notFoundError } from "../helper/handleError";
import {paginate} from "../helper/pagination";

export default {
    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 50;
            const results = await paginate(Product, {
                page,
                limit,
                maxLimit: 100
            });
            res.status(200).json(results);
        } catch (error) {
            handleError(res, error, "Failed to get products");
        }
    },

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            handleError(res, error, "Failed to create product");
        }
    },

    async updateProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
            if (!product) {
                notFoundError(res, "Product not found");
                return;
            }
            res.status(200).json(product);
        } catch (error) {
            handleError(res, error, "Failed to update product");
        }
    },

    async deleteProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                notFoundError(res, "Product not found");
                return;
            }
            res.status(200).json(product);
        } catch (error) {
            handleError(res, error, "Failed to delete product");
        }
    }
};
