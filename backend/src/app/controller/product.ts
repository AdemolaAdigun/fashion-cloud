import { Request, Response } from 'express';
import Product from "../model/product";
import { handleError, notFoundError } from "../helper/handleError";
import paginate from "../helper/handlePagination";

export default {
    async getProducts(request: Request, response: Response): Promise<void> {
        try {
            const {
                brand,
                category,
                order
            } = request.query;

            const query: Record<string, any> = {};

            if (brand) {
                query["brandName"] = brand;
            }

            if (category) {
                query["category"] = category;
            }

            const { skip, limit } = paginate(request);

            // Default order is descending. If 'order' query param is set to 'ascending', set price to 1.
            const sortOrder = order === 'ascending' ? 1 : -1;

            const products = await Product.find(query)
                .skip(skip)  // We skip based on page number.
                .limit(limit)
                .sort({ price: sortOrder }); // Sorting by price

            if (products.length === 0) {
                notFoundError(response, "No products found based on the given criteria");
                return;
            }

            response.status(200).json(products);
        } catch (error) {
            handleError(response, error, "Failed to get products");
        }
    },

    async createProduct(request: Request, response: Response): Promise<void> {
        try {
            const product = await Product.create(request.body);
            response.status(201).json(product);
        } catch (error) {
            handleError(response, error, "Failed to create product");
        }
    },

    async updateProductById(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        try {
            const product = await Product.findByIdAndUpdate(id, request.body, { new: true });
            if (!product) {
                notFoundError(response, "Product not found");
                return;
            }
            response.status(200).json(product);
        } catch (error) {
            handleError(response, error, "Failed to update product");
        }
    },

    async deleteProductById(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                notFoundError(response, "Product not found");
                return;
            }
            response.status(200).json(product);
        } catch (error) {
            handleError(response, error, "Failed to delete product");
        }
    }
};
