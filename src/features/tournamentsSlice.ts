import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, API_TOURNAMENTS_URL } from '../constants/constants';
import { TournamentType, InitialStateType } from '../types/types';

const initialState: InitialStateType = {
  tournamentsArray: [],
  status: 'idle',
  error: '',
};

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async () => {
    //todo: string itnerpolation
    const response = await fetch(API_TOURNAMENTS_URL);
    const body = await response.json();
    return body;
  }
);

export const addNewTournament = createAsyncThunk(
  'tournaments/addNewTournament',
  async (newTournamentName: any) => {
    try {
      const addedTournament = {
        name: newTournamentName,
      };
      const response = await fetch(API_TOURNAMENTS_URL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(addedTournament),
      });

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteTournament = createAsyncThunk(
  'tournaments/deleteTournament',
  async (id: string) => {
    try {
      const response = await fetch(`${API_TOURNAMENTS_URL}/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

interface updateArg {
  id: string;
  newTournamentName: string;
}

export const updateTournament = createAsyncThunk(
  'tournaments/updateTournament',
  async ({ id, newTournamentName }: updateArg) => {
    const updatedTournament = {
      name: newTournamentName,
    };
    try {
      const response = await fetch(`${API_TOURNAMENTS_URL}/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(updatedTournament),
      });
      updateTournamentStore({ id, newTournamentName });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    updateTournamentStore(state, action) {
      const { id, name } = action.payload;
      const currentTournament = state.tournamentsArray.find(
        (tournament): Boolean => tournament.id === id
      );

      /*       if (currentTournament) {
        currentTournament.name = name;
      } */
    },
    /* delete tournament from store and update
     deleteTournament(state, action) {
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

export const { updateTournamentStore } = tournamentsSlice.actions;

export default tournamentsSlice.reducer;

export const AllTournaments = (state: typeof initialState) =>
  state.tournamentsArray;
