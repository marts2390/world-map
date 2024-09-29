import { ResponseModel } from '@src/types/ResponseModal';
import { AxiosInstance } from '../connector';
import { AxiosResponse } from 'axios';
import { SearchResult } from '@src/types/SearchResult';
import { defaultResult } from '../utils/defaultResponse';
import { responseHandler } from '../utils/responseHandler';
import { errorHandler } from '../utils/errorHandler';
import { AutocompleteResults } from '@src/types/AutocompleteResults';
import { PlaceDetails } from '@src/types/PlaceDetails';

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

  getPlaceDetails = async (
    placeId: string,
  ): Promise<ResponseModel<PlaceDetails | null>> => {
    let result = defaultResult<PlaceDetails>();

    try {
      const response = await AxiosInstance.get<
        PlaceDetails,
        AxiosResponse<PlaceDetails>
      >('/place/details/json', {
        params: {
          place_id: placeId,
        },
      });

      result = responseHandler<PlaceDetails>(response, result);
    } catch (e) {
      const { hasError, errorData } = errorHandler<PlaceDetails>(e);

      result.hasError = hasError;
      result.errorData = errorData;
    }

    return result;
  };

  getAutoCompleteResults = async (
    input: string,
  ): Promise<ResponseModel<AutocompleteResults | null>> => {
    let result = defaultResult<AutocompleteResults>();

    try {
      const response = await AxiosInstance.get<
        AutocompleteResults,
        AxiosResponse<AutocompleteResults>
      >('/place/autocomplete/json', {
        params: {
          input,
        },
      });

      result = responseHandler<AutocompleteResults>(response, result);
    } catch (e) {
      const { hasError, errorData } = errorHandler<AutocompleteResults>(e);

      result.hasError = hasError;
      result.errorData = errorData;
    }

    return result;
  };

  getLocationPhotos = async (
    ref: string,
  ): Promise<ResponseModel<Blob | null>> => {
    let result = defaultResult<Blob>();

    try {
      const response = await AxiosInstance.get<Blob, AxiosResponse<Blob>>(
        '/place/photo',
        {
          responseType: 'blob',
          params: {
            maxwidth: 400,
            photo_reference: ref,
          },
        },
      );

      result = responseHandler<Blob>(response, result);
    } catch (e) {
      const { hasError, errorData } = errorHandler<AutocompleteResults>(e);

      result.hasError = hasError;
      result.errorData = errorData;
    }

    return result;
  };
}

export default new MapActions();
