import { ApiError, ResponseModel } from '@src/types/ResponseModal';
import { AxiosResponse, HttpStatusCode } from 'axios';

export const responseHandler = <T>(
  res: AxiosResponse<T>,
  result: ResponseModel<T | null>,
): ResponseModel<T | null> => {
  const invalidCodes = [
    HttpStatusCode.NotFound,
    HttpStatusCode.InternalServerError,
    HttpStatusCode.BadRequest,
    HttpStatusCode.Conflict,
    HttpStatusCode.MethodNotAllowed,
  ];

  // Handle no content response
  if (res.status === HttpStatusCode.NoContent) {
    result.value = null;

    return result;
  }

  // Handle errors
  if (invalidCodes.includes(res.status)) {
    result.hasError = true;
    const err = res?.data as ApiError;

    if ('apierror' in err) {
      result.errorData.message = err.apierror.message;
      result.errorData.status = res.status;
    } else {
      result.errorData.message = err.message;
      result.errorData.status = res.status;
    }

    return result;
  }

  // return result if no errors
  result.value = res.data;

  return result;
};
