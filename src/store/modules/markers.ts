import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReducer, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { Marker } from '@src/types/Marker';
import { AppRootState } from '@store/index';

/**
 * Type declarations
 * ---------------------------------------------------------------------
 */

export interface StateProps {
  markers: Marker[];
  error: boolean;
}

/**
 * Initial State
 * ---------------------------------------------------------------------
 */

export const initialState: StateProps = {
  markers: [],
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

/**
 * Reducer
 * ---------------------------------------------------------------------
 */

export const reducer = createReducer<StateProps>(initialState, (builder) => {
  builder.addMatcher(
    isAnyOf(getMarkers.fulfilled, addMarker.fulfilled, removeMarker.fulfilled),
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
