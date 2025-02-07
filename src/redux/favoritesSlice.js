import { createSlice } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const existingCar = state.favorites.find((car) => car.model === action.payload.model);
      if (!existingCar) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((car) => car.model !== action.payload.model);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
