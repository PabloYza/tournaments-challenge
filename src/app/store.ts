import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import tournamentReducer from '../features/tournamentsSlice';

const store = configureStore({
  reducer: {
    Tournaments: tournamentReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
