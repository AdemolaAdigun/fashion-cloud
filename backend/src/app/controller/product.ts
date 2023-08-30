import { Request, Response } from 'express';
import Product from "../model/product";
import { handleError, notFoundError } from "../helper/handleError";
import paginate from "../helper/handlePagination";

export default {
    /**
     * Fetches products based on provided criteria.
     *
     * @param {Request} request - Express request object.
     * @param {Response} response - Express response object.
     */
    async getProducts(request: Request, response: Response): Promise<void> {
        try {
            const {
                brand,
                category,
                order
            } = request.query;

            const query: Record<string, any> = {};

            // Filter by brand if provided
            if (brand) {
                query["brandName"] = brand;
            }

            // Filter by category if provided
            if (category) {
                query["category"] = category;
            }

            // Paginate results
            const { skip, limit } = paginate(request);

            // Set order of product results based on query
            const sortOrder = order === 'ascending' ? 1 : -1;

            // Fetch products
            const products = await Product.find(query)
                .skip(skip)  // Skips results based on page number.
                .limit(limit)
                .sort({ price: sortOrder }); // Sorts results by price

            if (products.length === 0) {
                notFoundError(response, "No products found based on the given criteria");
                return;
            }

            response.status(200).json(products);
        } catch (error) {
            handleError(response, error, "Failed to get products");
        }
    },

    /**
     * Creates a new product.
     *
     * @param {Request} request - Express request object.
     * @param {Response} response - Express response object.
     */
    async createProduct(request: Request, response: Response): Promise<void> {
        try {
            const product = await Product.create(request.body);
            response.status(201).json(product);
        } catch (error) {
            handleError(response, error, "Failed to create product");
        }
    },

    /**
     * Updates a product by its ID.
     *
     * @param {Request} request - Express request object.
     * @param {Response} response - Express response object.
     */
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

    /**
     * Deletes a product by its ID.
     *
     * @param {Request} request - Express request object.
     * @param {Response} response - Express response object.
     */
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
