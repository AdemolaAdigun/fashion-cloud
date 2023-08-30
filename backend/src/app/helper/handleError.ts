import { Response } from 'express';

/**
 * Handles unexpected errors and sends a response with a 500 status code.
 *
 * @param {Response} res - The Express response object.
 * @param {Error} error - The encountered error.
 * @param {string} [message="An error occurred"] - Optional custom error message.
 */
export const handleError = (res: Response, error: Error, message: string = "An error occurred") => {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message });
};

/**
 * Sends a response with a 400 status code for "not found" scenarios.
 *
 * @param {Response} res - The Express response object.
 * @param {string} [message="Result(s) cannot be Found!"] - Optional custom message.
 */
export const notFoundError = (res: Response, message: string = "Result(s) cannot be Found!") => {
    res.status(400).json({ message });
}
