import { Response } from 'express';
export const handleError = (res: Response, error: Error, message: string = "An error occurred") => {
    console.error(error);
    res.status(500).json({ message });
};

export const notFoundError = (res: Response, message: string = "Result(s) cannot be Found!") => {
    res.status(400).json({ message });
}