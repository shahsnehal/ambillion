import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { combinedReducer } from './reducers';
import rootSaga from './sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configures the Redux store with reducers, saga middleware, and dev tools.
export const store = configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});
// Run the root saga
sagaMiddleware.run(rootSaga);

// Define TypeScript types for the Redux store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;

// Type representing the dispatch function of the Redux store.
export type AppDispatch = typeof store.dispatch;
