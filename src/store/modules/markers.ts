import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createReducer,
  createAsyncThunk,
  isAnyOf,
  createAction,
} from '@reduxjs/toolkit';
import { Marker } from '@src/types/Marker';

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

export const addMarker = createAction('markers/add-marker', (data: Marker) => ({
  payload: {
    ...data,
  },
}));

export const removeMarker = createAction(
  'markers/remove-marker',
  (data: Marker) => ({
    payload: {
      ...data,
    },
  }),
);

/**
 * Reducer
 * ---------------------------------------------------------------------
 */

export const reducer = createReducer<StateProps>(initialState, builder => {
  builder
    .addCase(addMarker, (state, action) => ({
      ...state,
      markers: [...state.markers, action.payload],
    }))
    .addCase(removeMarker, (state, action) => ({
      ...state,
      markers: state.markers.filter(
        item => item.coords.latitude !== action.payload.coords.latitude,
      ),
    }))
    .addMatcher(isAnyOf(getMarkers.fulfilled), (state, action) => ({
      ...state,
      ...action.payload,
    }));
});
