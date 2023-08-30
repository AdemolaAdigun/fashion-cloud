import {Request} from "express";

export default function paginate(request: Request) {
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 50;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
}