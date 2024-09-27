import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createReducer,
  createAsyncThunk,
  isAnyOf,
  createAction,
} from '@reduxjs/toolkit';
import delivery from '@src/delivery';
import { Marker } from '@src/types/Marker';
import { SearchResult } from '@src/types/SearchResult';
import { AppRootState, Dispatch } from '@store/index';
import { Region } from 'react-native-maps';

/**
 * Type declarations
 * ---------------------------------------------------------------------
 */

export interface StateProps {
  markers: Marker[];
  searchResult: SearchResult['results'] | null;
  region: Region | null;
  error: boolean;
}

/**
 * Initial State
 * ---------------------------------------------------------------------
 */

export const initialState: StateProps = {
  markers: [],
  searchResult: null,
  region: null,
  error: false,
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
  {id: number},
  {state: AppRootState}
>('markers/remove-marker', async ({ id }, { getState }) => {
  let data: StateProps['markers'] = initialState.markers;
  let error: StateProps['error'] = initialState.error;

  const state = getState().markers.markers;
  const newState = state.filter((item) => item.coords.latitude !== id);

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
  let data: StateProps['searchResult'] = initialState.searchResult;
  let error: StateProps['error'] = initialState.error;

  const { value, hasError } = await delivery.MapActions.getSearchResults(query);

  if (value) {
    data = value.results;

    console.log(value.results)

    dispatch(
      setRegion({
        latitude: value.results[0].geometry.location.lat,
        longitude: value.results[0].geometry.location.lng,
        latitudeDelta: value.results[0].geometry.viewport.southwest.lat,
        longitudeDelta: value.results[0].geometry.viewport.northeast.lng,
      }),
    );
  }

  if (hasError) {
    error = true;
  }

  return {
    searchResult: data,
    error: error,
  };
});

export const setRegion = createAction('markers/setRegion', (data: Region) => ({
  payload: {
    data,
  },
}));

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
    .addMatcher(
      isAnyOf(
        getMarkers.fulfilled,
        addMarker.fulfilled,
        removeMarker.fulfilled,
        handleSearch.fulfilled,
      ),
      (state, action) => ({
        ...state,
        ...action.payload,
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
