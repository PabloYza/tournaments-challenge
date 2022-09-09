import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import store from './app/store';

import GlobalStyle from './GlobalStyle';
import Container from './components/Container';
import TournamentsView from './features/tournamentsView';
import { fetchTournaments } from './features/tournamentsSlice';
import { useAppSelector } from './app/hooks';
import { POSTSTATUS_IDLE } from './constants/constants';

const App = () => {
  const dispatch = useDispatch<any>();
  const postStatus = useAppSelector((state) => state.Tournaments.status);
  useEffect(() => {
    if (postStatus === POSTSTATUS_IDLE) {
      dispatch(fetchTournaments());
    }
  }, []);

  return (
    <Container>
      <TournamentsView />
    </Container>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
