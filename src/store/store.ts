import { create } from 'zustand';
import { Passenger } from '../shared/api';

interface PassengersStore {
    passengers: Passenger[];
    displayedPassengers: Passenger[];
    searchQuery: string;
    visibleCount: number;
}

interface PassengersAction {
    setPassengers: (data: Passenger[]) => void;
    setDisplayedPassengers: (data: Passenger[]) => void;
    setSearchQuery: (query: string) => void;
    setVisibleCount: (count: number) => void;
}

export const usePassengersStore = create<PassengersStore & PassengersAction>((set) => ({
    passengers: [],
    displayedPassengers: [],
    searchQuery: '',
    visibleCount: 20,

    setPassengers: (data) => set({ passengers: data }),
    setDisplayedPassengers: (data) => set({ displayedPassengers: data }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setVisibleCount: (count) => set({ visibleCount: count }),
}));
