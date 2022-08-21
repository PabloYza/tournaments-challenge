import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_TOURNAMENTS_URL } from '../constants/constants';
import { TournamentType, InitialStateType } from '../types/types';

const initialState: InitialStateType = {
  tournamentsArray: [],
  status: 'idle',
  error: '',
};

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async () => {
    const response = await fetch(API_TOURNAMENTS_URL);
    const body = await response.json();
    return body;
  }
);

export const addNewTournament = createAsyncThunk(
  'tournaments/addNewTournament',
  async (newTournamentName: any) => {
    try {
      const newTournament = {
        name: newTournamentName,
      };
      const response = await fetch(API_TOURNAMENTS_URL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(newTournament),
      });

      return response.json();
    } catch (err) {
      console.error(err);
    }
  }
);

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    updateTournament(state, action) {
      debugger;
      const { id, name } = action.payload;
      const currentTournament = state.tournamentsArray.find(
        (tournament): Boolean => tournament.id === id
      );
      if (currentTournament) {
        currentTournament.name = name;
      }
    },

    /*     deleteTournament(state, action) {
      const { id } = action.payload
      return state.tournamentsArray.filter((tournament: TournamentType) => {
        tournament.id !== id
      })
    } */
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTournaments.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(
        fetchTournaments.fulfilled,
        (state, action: PayloadAction<TournamentType[]>) => {
          state.status = 'fulfilled';
          state.tournamentsArray = action.payload;
          state.error = '';
        }
      )
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.tournamentsArray = [];
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { updateTournament } = tournamentsSlice.actions;

export default tournamentsSlice.reducer;

export const AllTournaments = (state: typeof initialState) =>
  state.tournamentsArray;
