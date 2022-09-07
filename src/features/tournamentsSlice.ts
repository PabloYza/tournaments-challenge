import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API_TOURNAMENTS_URL } from '../constants/constants';
import { TournamentType, InitialStateType, updateArg } from '../types/types';

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

/* I have a problem here that I am not sure how to solve, the page needs a full reload to show
the created tournament. I'm trying to make use of optimistic updates but this is bugging me. I dont
want to force an update but its one of the few options I have 
 */
export const addNewTournament = createAsyncThunk(
  'tournaments/addNewTournament',
  async (newTournamentName: string) => {
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
      }).then((response) => {
        return response;
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

export const updateTournament = createAsyncThunk(
  'tournaments/updateTournament',
  async ({ id, name }: updateArg) => {
    const updatedTournament = {
      name,
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
    addTournamentStore(state, action) {
      const newTournament = action.payload;
      state.tournamentsArray.push(newTournament);
    },
    updateTournamentStore(state, action) {
      const { id, name } = action.payload;
      const currentTournament = state.tournamentsArray.find(
        (tournament): Boolean => tournament.id === id
      );
      if (currentTournament) {
        currentTournament.name = name;
      }
    },
    deleteTournamentStore(state, action) {
      const id = action.payload;
      state.tournamentsArray = state.tournamentsArray.filter(
        (tournament) => tournament.id !== id
      );
    },
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

export const {
  updateTournamentStore,
  deleteTournamentStore,
  addTournamentStore,
} = tournamentsSlice.actions;

export default tournamentsSlice.reducer;
