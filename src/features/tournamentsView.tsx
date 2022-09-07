import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';

import { fetchTournaments } from './tournamentsSlice';
import Card from '../components/Card';
import Button from '../components/Button';
import { CardContainer, ErrorContent, LoadedContent } from '../styles';
import { TournamentType } from '../types/types';

const TournamentsView = (searchInput: any) => {
  const dispatch = useDispatch<any>();
  const tournaments = useAppSelector(
    (state) => state.Tournaments.tournamentsArray
  );
  const [tournamentsArray, setTournamentsArray] =
    useState<TournamentType[]>(tournaments);
  const postStatus = useAppSelector((state) => state.Tournaments.status);

  /* 	const [tournamentData, setTournamentData] = useState<TournamentType[]>(tournaments)
    if (searchInput.length > 0) {
      setTournamentData(tournaments.filter((tournament: TournamentType)=> {
        return tournament.name.includes(searchInput)
      }))
    } */

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchTournaments());
      setTournamentsArray(tournaments);
      console.log('asdasd', tournaments);
    }
    if (searchInput !== ' ') {
      const filteredTournaments = tournaments.filter((tournament) =>
        tournament.name.toLowerCase().includes(searchInput)
      );
      setTournamentsArray(filteredTournaments);
    }
  }, [postStatus, dispatch, searchInput, tournaments]);

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

  return <CardContainer>{content}</CardContainer>;
};

export default TournamentsView;
