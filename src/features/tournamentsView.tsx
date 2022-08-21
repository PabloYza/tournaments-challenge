import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { fetchTournaments } from './tournamentsSlice';

import Card from '../components/Card';
import { CardContainer, ErrorContent, LoadedContent } from '../styles';
import Button from '../components/Button';

const TournamentsView = (searchInput: any) => {
  const dispatch = useDispatch<any>();
  const tournaments = useAppSelector(
    (state) => state.Tournaments.tournamentsArray
  );
  const postStatus = useAppSelector((state) => state.Tournaments.status);
  const error = useAppSelector((state) => state.Tournaments.error);

  /* 	const [tournamentData, setTournamentData] = useState<TournamentType[]>(tournaments)
		if (searchInput.length > 0) {
			setTournamentData(tournaments.filter((tournament: TournamentType)=> {
				return tournament.name.includes(searchInput)
			}))
		} */

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchTournaments());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === '') {
    content = (
      <LoadedContent>
        <p>Loading Tournaments...</p>
      </LoadedContent>
    );
  } else if (postStatus === '') {
    content = tournaments?.map(
      ({ id, name, organizer, game, participants, startDate }) => (
        <CardContainer>
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
        </CardContainer>
      )
    );
  } else if (postStatus === 'fulfilled') {
    content = (
      <ErrorContent>
        <p>Something went wrong</p>
        <Button onClick={() => dispatch(fetchTournaments())}>RETRY</Button>
      </ErrorContent>
    );
  }

  return <div>{content}</div>;
};

export default TournamentsView;
