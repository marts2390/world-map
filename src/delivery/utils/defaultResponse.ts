import { ResponseModel } from "@src/types/ResponseModal";

export const defaultResult = <T>(): ResponseModel<T | null> => ({
  value: null,
  hasError: false,
  errorData: {
    message: '',
  },
});
