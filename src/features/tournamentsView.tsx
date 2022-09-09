import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../app/hooks';
import { addNewTournament, fetchTournaments } from './tournamentsSlice';
import { TournamentType } from '../types/types';

import Card from '../components/Card';
import Button from '../components/Button';
import {
  CardContainer,
  ErrorContent,
  InputContainer,
  LoadedContent,
} from '../styles';
import H4 from '../components/H4';
import SearchBar from '../components/SearchBar';

const TournamentsView = () => {
  /* doing const dispatch = useAppDispatch(); || const dispatch : AppDispatch = useDispatch();
  gives me an error of: Argument of type 'AsyncThunkAction<any, string, {}>' 
  is not assignable to parameter of type 'AnyAction' 
  forcing me to type de useDispatch with any*/
  const dispatch = useDispatch<any>();
  const postStatus = useAppSelector((state) => state.Tournaments.status);
  const fetchedTournaments = useAppSelector(
    (state) => state.Tournaments.tournamentsArray
  );
  const [searchInput, setSearchInput] = useState<string>('');
  const [tournamentsArray, setTournamentsArray] = useState<TournamentType[]>(
    []
  );

  useEffect(() => {
    setTournamentsArray(fetchedTournaments);
  }, [fetchedTournaments]);

  const handleCreate = () => {
    let newTournamentName: string = window.prompt('Tournament name') || '';
    dispatch(addNewTournament(newTournamentName));
    /*     I know this is not the right way of handling this,
    but I have to wait for the api response to be able to show the new tournament and
    calling dispatch(fetchTournaments) doesnt behave how I expect it... 
    Would love to see how to execute it properly  */
    /* eslint-disable */
    location.reload();
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchInput(target.value);
    const filteredTournaments = fetchedTournaments.filter((tournament) =>
      tournament.name.toLowerCase().includes(target.value)
    );
    setTournamentsArray(filteredTournaments);
  };

  let content;
  if (postStatus === '') {
    content = (
      <LoadedContent>
        <p>Loading Tournaments...</p>
      </LoadedContent>
    );
  } else if (postStatus === 'fulfilled') {
    {
      content = tournamentsArray?.map(
        ({ id, name, organizer, game, participants, startDate }) => (
          <div key={id}>
            <Card
              id={id}
              name={name}
              organizer={organizer}
              game={game}
              participants={participants}
              startDate={startDate}
            />
          </div>
        )
      );
    }
  } else if (postStatus === 'rejected') {
    content = (
      <ErrorContent>
        <p>Something went wrong</p>
        <Button onClick={() => dispatch(fetchTournaments())}>RETRY</Button>
      </ErrorContent>
    );
  }

  return (
    <>
      <H4>FACEIT Tournaments</H4>
      <div>
        <InputContainer>
          <SearchBar
            searchInput={searchInput}
            handleInputChange={handleInputChange}
          />
          <Button onClick={handleCreate} type="button">
            CREATE TOURNAMENT
          </Button>
        </InputContainer>
      </div>
      <CardContainer>{content}</CardContainer>
    </>
  );
};

export default TournamentsView;
