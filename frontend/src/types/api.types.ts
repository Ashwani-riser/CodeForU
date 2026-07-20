export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
  stack?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
