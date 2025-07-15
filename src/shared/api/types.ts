export interface Passenger {
  id: number;
  class: string;
  survived: boolean;
  name: string;
  gender: string;
  age: number | null;
  sibsp: string;
  parch: string;
  ticket: string;
  fare: string;
  cabin: string | null;
  embarked: string;
  boat: string | null;
  body: string | null;
  homeDest: string | null;
}
