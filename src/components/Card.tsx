import React, { useEffect, useState } from 'react';
import { CardPropTypes } from '../types/types';
import { enGB } from '../constants/constants';
import H6 from './H6';
import { CardStyled } from '../styles';
import Button from './Button';
import { useDispatch } from 'react-redux';
import {
  deleteTournament,
  deleteTournamentStore,
  updateTournament,
  updateTournamentStore,
} from '../features/tournamentsSlice';

const Card = (tournament: CardPropTypes) => {
  const { id, name, organizer, game, participants, startDate } = tournament;
  const dispatch = useDispatch<any>();
  const [formatedDate, setFormatedDate] = useState<string>();

  useEffect(() => {
    setFormatedDate(new Date(startDate).toLocaleString(enGB));
  }, [startDate]);

  const handleDelete = (id: string) => {
    dispatch(deleteTournament(id));
    dispatch(deleteTournamentStore(id));
  };

  const handleUpdate = (id: string) => {
    let newTournamentName: string = window.prompt('New tournament name') || '';
    dispatch(updateTournament({ id, name: newTournamentName }));
    dispatch(updateTournamentStore({ id, name: newTournamentName }));
  };

  return (
    <CardStyled key={id}>
      <H6>{name}</H6>
      <p>{organizer} </p>
      <p>{game} </p>
      <p>
        {participants.current} / {participants.max}
      </p>
      <p>{formatedDate}</p>
      <div>
        <Button onClick={() => handleUpdate(id)}>EDIT</Button>
        <Button onClick={() => handleDelete(id)}>DELETE</Button>
      </div>
    </CardStyled>
  );
};

export default Card;
