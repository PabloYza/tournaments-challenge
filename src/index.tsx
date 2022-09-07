import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import store from './app/store';

import GlobalStyle from './GlobalStyle';
import Container from './components/Container';
import H4 from './components/H4';
import Input from './components/Input';
import Button from './components/Button';
import TournamentsView from './features/tournamentsView';
import { InputContainer } from './styles';
import { addNewTournament } from './features/tournamentsSlice';

const App = () => {
  const dispatch = useDispatch<any>();
  const [searchInput, setSearchInput] = useState<any>(' ');

  const handleChange = (e: any) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
  };

  const handleCreate = () => {
    let newTournamentName: string = window.prompt('Tournament name') || '';
    dispatch(addNewTournament(newTournamentName));
  };

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <div>
        <InputContainer>
          <Input onChange={handleChange} placeholder="Search tournament..." />
          <Button onClick={handleCreate} type="button">
            CREATE TOURNAMENT
          </Button>
        </InputContainer>
        <TournamentsView searchInput={searchInput} />
      </div>
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
