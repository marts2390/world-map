// 400 error
export type ApiNotFoundError = {
  apierror: {
    debugMessage: string;
    message: string;
    status: string;
    subErrors: string | null;
    timestamp: string;
  };
};

// 500 error
export type ApiFailError = {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
};

export type ApiError = ApiNotFoundError | ApiFailError;

export interface ResponseModel<DataType> {
  value: DataType;
  errorData: {
    message: string;
    status?: string | number;
  };
  hasError: boolean;
}
