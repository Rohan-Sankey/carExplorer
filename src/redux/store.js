import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // ✅ Check this path
import favoritesReducer from './favoritesSlice'; // Import the favorites reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer, // Add favorites reducer
  },
});

export default store;
