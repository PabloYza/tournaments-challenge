import React, { useEffect, useState } from 'react';
import { TournamentType } from '../types/types';
import { enGB } from '../constants/constants';
import H6 from './H6';
import { CardStyled } from '../styles';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { updateTournament } from '../features/tournamentsSlice';

const Card = (tournament: TournamentType) => {
  const { id, name, organizer, game, participants, startDate } = tournament;
  const dispatch = useDispatch<any>();
  const [formatedDate, setFormatedDate] = useState<string>();
  useEffect(() => {
    setFormatedDate(new Date(startDate).toLocaleString(enGB));
  }, [startDate]);

  const handleDelete = (id: string) => {};

  const handleUpdate = (id: string) => {
    let newTournamentName = window.prompt('New tournament name');
    const updatedData = dispatch(updateTournament(id));
  };

  return (
    <div key={id}>
      <CardStyled>
        <H6>{name}</H6>
        <p>{organizer} </p>
        <p>{game} </p>
        <p>
          {participants.current} / {participants.max}
        </p>
        <p>{formatedDate}</p>
        <div>
          <Button onClick={() => handleUpdate(id)}>EDIT</Button>
          <Button>DELETE</Button>
        </div>
      </CardStyled>
    </div>
  );
};

export default Card;
