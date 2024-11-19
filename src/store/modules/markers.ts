import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createReducer,
  createAsyncThunk,
  isAnyOf,
  createAction,
} from '@reduxjs/toolkit';
import delivery from '@src/delivery';
import { AutocompleteResults } from '@src/types/AutocompleteResults';
import { Marker } from '@src/types/Marker';
import { PlaceDetails } from '@src/types/PlaceDetails';
import { Region } from '@src/types/Region';
import { AppRootState, Dispatch } from '@store/index';
import { Dimensions } from 'react-native';

/**
 * Type declarations
 * ---------------------------------------------------------------------
 */

export interface StateProps {
  markers: Marker[];
  autoCompleteResults: AutocompleteResults['predictions'] | null;
  details: PlaceDetails['result'] | null;
  region: Region | null;
  placePhotos: Blob[];
  error: boolean;
  resultsLoading: boolean;
  detailsLoading: boolean;
}

/**
 * Initial State
 * ---------------------------------------------------------------------
 */

export const initialState: StateProps = {
  markers: [],
  autoCompleteResults: null,
  details: null,
  region: null,
  error: false,
  placePhotos: [],
  resultsLoading: false,
  detailsLoading: false,
};

export const getMarkers = createAsyncThunk<Partial<StateProps>>(
  'markers/get-markers',
  async () => {
    let data: StateProps['markers'] = initialState.markers;

    const markers = await AsyncStorage.getItem('markers');

    if (markers) {
      data = JSON.parse(markers);
    }

    return {
      markers: data,
    };
  },
);

export const addMarker = createAsyncThunk<
  Partial<StateProps>,
  {marker: Marker},
  {state: AppRootState}
>('markers/add-marker', async ({ marker }, { getState }) => {
  let data: StateProps['markers'] = initialState.markers;
  let error: StateProps['error'] = initialState.error;

  const state = getState().markers.markers;
  const newState = [...state, marker];

  const update = await updateMarkers(newState);

  if (update) {
    data = newState;
  }

  if (!update) {
    error = true;
  }

  return {
    markers: data,
    error: error,
  };
});

export const removeMarker = createAsyncThunk<
  Partial<StateProps>,
  {id: string},
  {state: AppRootState}
>('markers/remove-marker', async ({ id }, { getState }) => {
  let data: StateProps['markers'] = initialState.markers;
  let error: StateProps['error'] = initialState.error;

  const state = getState().markers.markers;
  const newState = state.filter((item) => item.id !== id);

  const update = await updateMarkers(newState);

  if (update) {
    data = newState;
  }

  if (!update) {
    error = true;
  }

  return {
    markers: data,
    error: error,
  };
});

export const handleSearch = createAsyncThunk<
  Partial<StateProps>,
  {query: string},
  {dispatch: Dispatch}
>('markers/handle-search', async ({ query }, { dispatch }) => {
  let error: StateProps['error'] = initialState.error;

  const { value, hasError } = await delivery.MapActions.getSearchResults(query);

  if (value) {
    const { place_id, geometry, name } = value.results[0];

    dispatch(getPlaceDetails({ id: place_id }));
    dispatch(
      addMarker({
        marker: {
          id: place_id,
          longitude: geometry.location.lng,
          latitude: geometry.location.lat,
          title: name,
        },
      }),
    );

    const { width, height } = Dimensions.get('window');

    const latDelta =
      value.results[0].geometry.viewport.northeast.lat -
      value.results[0].geometry.viewport.southwest.lat;
    const lngDelta = latDelta * (width / height);

    dispatch(
      setRegion({
        latitude: value.results[0].geometry.location.lat,
        longitude: value.results[0].geometry.location.lng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
      }),
    );

    dispatch(clearAutocomplete());
  }

  if (hasError) {
    error = true;
  }

  return {
    error: error,
  };
});

export const getPlaceDetails = createAsyncThunk<
  Partial<StateProps>,
  {id: string},
  {dispatch: Dispatch}
>('markers/get-place-details', async ({ id }) => {
  let error: StateProps['error'] = initialState.error;
  let photos: StateProps['placePhotos'] = initialState.placePhotos;
  let details: StateProps['details'] = initialState.details;

  const { value, hasError } = await delivery.MapActions.getPlaceDetails(id);

  if (value) {
    details = value.result;
    photos = await getPhotos(
      value.result.photos.map((item) => item.photo_reference),
    );
  }

  if (hasError) {
    error = true;
  }

  return {
    details: details,
    placePhotos: photos,
    error: error,
  };
});

export const getAutoCompleteResults = createAsyncThunk<
  Partial<StateProps>,
  {query: string}
>('markers/get-auto-complete-results', async ({ query }) => {
  let data: StateProps['autoCompleteResults'] =
    initialState.autoCompleteResults;
  let error: StateProps['error'] = initialState.error;

  const { value, hasError } =
    await delivery.MapActions.getAutoCompleteResults(query);

  if (value) {
    data = value.predictions;
  }

  if (hasError) {
    error = true;
  }

  return {
    autoCompleteResults: data,
    error: error,
  };
});

export const setRegion = createAction('markers/set-region', (data: Region) => ({
  payload: {
    data,
  },
}));

export const clearAutocomplete = createAction('markers/clear-autocomplete');

/**
 * Reducer
 * ---------------------------------------------------------------------
 */

export const reducer = createReducer<StateProps>(initialState, (builder) => {
  builder
    .addCase(setRegion, (state, action) => ({
      ...state,
      region: action.payload.data,
    }))
    .addCase(clearAutocomplete, (state) => ({
      ...state,
      autoCompleteResults: null,
    }))
    .addMatcher(
      isAnyOf(
        getMarkers.fulfilled,
        addMarker.fulfilled,
        removeMarker.fulfilled,
        handleSearch.fulfilled,
        getAutoCompleteResults.fulfilled,
        getPlaceDetails.fulfilled,
      ),
      (state, action) => ({
        ...state,
        ...action.payload,
      }),
    )
    // Loading start
    .addMatcher(isAnyOf(getAutoCompleteResults.pending), (state) => ({
      ...state,
      resultsLoading: true,
    }))
    .addMatcher(isAnyOf(getPlaceDetails.pending), (state) => ({
      ...state,
      detailsLoading: true,
    }))
    // Loading end
    .addMatcher(
      isAnyOf(
        getAutoCompleteResults.rejected,
        getAutoCompleteResults.fulfilled,
      ),
      (state) => ({
        ...state,
        resultsLoading: false,
      }),
    )
    .addMatcher(
      isAnyOf(getPlaceDetails.rejected, getPlaceDetails.fulfilled),
      (state) => ({
        ...state,
        detailsLoading: false,
      }),
    );
});

/**
 * Utils
 * ---------------------------------------------------------------------
 */

export const updateMarkers = async (markers: Marker[]): Promise<boolean> => {
  let success: boolean;

  try {
    await AsyncStorage.setItem('markers', JSON.stringify(markers));

    success = true;
  } catch {
    success = false;
  }

  return success;
};

export const getPhotos = async (refs: string[]): Promise<Blob[]> => {
  const promises = refs.map(async (item) => {
    const { value } = await delivery.MapActions.getLocationPhotos(item);

    if (value) {
      return value;
    }
  });

  const allBlobs = (await Promise.all(promises)).filter((item) => !!item);

  return allBlobs;
};
