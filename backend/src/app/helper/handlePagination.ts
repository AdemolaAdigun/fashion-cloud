import {Request} from "express";

/**
 * Extracts pagination parameters from the request and calculates the number of documents to skip.
 *
 * @param {Request} request - The incoming Express request object.
 * @returns {object} An object containing calculated values for page, limit, and skip.
 */
export default function paginate(request: Request) {
    // Get page and limit from the request, and set default values if they are not provided.
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 50;

    // Calculate the number of documents to skip for pagination.
    const skip = (page - 1) * limit;

    return { page, limit, skip };
}
