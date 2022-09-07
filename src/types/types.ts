export interface TournamentType {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: Date;
}

export interface InitialStateType {
  tournamentsArray: TournamentType[];
  status: string;
  error: string;
}

export interface CardPropTypes extends TournamentType {}

export interface updateArg {
  id: string;
  name: string;
}
