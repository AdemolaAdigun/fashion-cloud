interface PaginationOptions {
    page: number;
    limit: number;
    maxLimit?: number;
}

interface PaginatedResults<T> {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: T[];
}

export const paginate = async (
    model: any,
    options: PaginationOptions
): Promise<PaginatedResults<any>> => {
    const page = options.page;
    const limit = options.limit;

    if (options.maxLimit && limit > options.maxLimit) {
        throw new Error("Limit too large");
    }

    const skip = (page - 1) * limit;
    const data = await model.find().skip(skip).limit(limit);
    const totalItems = await model.countDocuments();

    return {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        data
    };
}