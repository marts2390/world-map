import { ResponseModel } from '@src/types/ResponseModal';
import { AxiosInstance } from '../connector';
import { AxiosResponse } from 'axios';
import { SearchResult } from '@src/types/SearchResult';
import { defaultResult } from '../utils/defaultResponse';
import { responseHandler } from '../utils/responseHandler';
import { errorHandler } from '../utils/errorHandler';

class MapActions {
  getSearchResults = async (
    query: string,
  ): Promise<ResponseModel<SearchResult | null>> => {
    let result = defaultResult<SearchResult>();

    try {
      const response = await AxiosInstance.get<
        SearchResult,
        AxiosResponse<SearchResult>
      >('/place/textsearch/json', {
        params: {
          query,
        },
      });

      result = responseHandler<SearchResult>(response, result);
    } catch (e) {
      const { hasError, errorData } = errorHandler<SearchResult>(e);

      result.hasError = hasError;
      result.errorData = errorData;
    }

    return result;
  };
}

export default new MapActions();
