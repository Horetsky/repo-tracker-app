export interface RequestWithPagination {
    page: number;
    limit: number;
}

export interface ResponseWithPagination<Data> {
    data: Data;
    pagination: {
        page: number;
        limit: number;
        totalPages: number;
        totalItems: number;
    };
}