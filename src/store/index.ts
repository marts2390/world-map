// Redux
import {
  configureStore,
  combineReducers,
  ActionFromReducersMapObject,
  Reducer,
  StateFromReducersMapObject,
  EnhancedStore,
} from '@reduxjs/toolkit';
// Modules
import * as Markers from './modules/markers';

/**
 * Types
 * ---------------------------------------------------------------------
 */

export type RootReducer<T> = Reducer<
  StateFromReducersMapObject<T>,
  ActionFromReducersMapObject<T>
>;

export type AppRootState = ReturnType<typeof rootReducer>;

export type Dispatch = typeof store.dispatch;

export type AppStore = ReturnType<typeof configureStore>;

export type Action<Payload, Args extends Array<unknown>> = (...args: Args) => {
  payload: Payload;
};

/**
 * Store Setup
 * ---------------------------------------------------------------------
 */

export const rootReducer = combineReducers({
  markers: Markers.reducer,
});

// Set up the store
export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const setupStore = (
  preloadedState?: Partial<AppRootState>,
): EnhancedStore =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
    preloadedState,
  });

/**
 * Exports
 * ---------------------------------------------------------------------
 */

// Module exports
export { Markers };

// Provider exports

export * from './utils/provider';

export * from './utils/react-redux';
