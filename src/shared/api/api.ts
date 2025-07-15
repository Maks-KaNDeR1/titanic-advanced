import { Passenger } from './types';

const url = 'https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json';

export const fetchPassengersData = async (): Promise<Passenger[]> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
