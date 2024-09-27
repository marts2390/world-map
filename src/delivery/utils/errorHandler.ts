
import { ResponseModel, ApiError } from '@src/types/ResponseModal';
import { isAxiosError } from 'axios';

export const errorHandler = <T>(
  e: unknown,
): Omit<ResponseModel<T>, 'value'> => {
  const errorRes: Omit<ResponseModel<T>, 'value'> = {
    hasError: false,
    errorData: {
      message: '',
    },
  };

  if (isAxiosError(e)) {
    const err = e.response?.data as ApiError;

    errorRes.hasError = true;

    if (!err) {
      return errorRes;
    }

    if ('apierror' in err) {
      errorRes.errorData.message = err.apierror.message;
      errorRes.errorData.status = err.apierror.status;
    } else {
      errorRes.errorData.message = err.message;
      errorRes.errorData.status = err.status;
    }
  }

  return errorRes;
};
