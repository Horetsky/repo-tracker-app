interface PaginationDtoParams {
    page: number;
    total: number;
    limit: number;
}

class PaginationDto {
    page: number = 1;
    limit: number = 1;
    totalPages: number = 0;
    totalItems: number = 0;

    constructor(input: Partial<PaginationDtoParams> = {}) {
        if(input.page) this.page = input.page;
        if(input.total) this.totalItems = input.total;

        if(input.limit) {
            this.limit = input.limit;

            if(input.total) {
                this.totalPages = Math.ceil(input.total/ input.limit);
            }
        }
    }
}

export class ResponseWithPaginationDto<Data> {
    data: Data;
    pagination: PaginationDto;

    constructor(data: Data, pagination: Partial<PaginationDtoParams> = {}) {
        this.data = data;
        this.pagination = new PaginationDto(pagination);
    }
}