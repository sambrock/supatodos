export interface ApiError extends Error {
  code?: number;
  stack?: string;
}

export type ApiResponse =
  | {
      success: true;
      data: any;
    }
  | {
      success: false;
      error: ApiError;
    };

export type Api = (...params: string[]) => Promise<ApiResponse>;
