import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; 
import { combineReducers } from 'redux';
import authReducer from '../redux/features/authSlice'; 
import { baseApi } from './api/baseApi';
import { authApi } from './api/authApi';


// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth'], 
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer, 
  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer, 
});

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(baseApi.middleware, authApi.middleware),
});

// Export persistor for session persistence
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
