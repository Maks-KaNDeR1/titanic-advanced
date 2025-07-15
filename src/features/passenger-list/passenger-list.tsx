import React, {
    useEffect, useState, useCallback, useMemo,
} from 'react';
import styles from './passenger-list.module.scss';
import { Button } from '../../shared/ui/button';
import { SearchInput } from '../../shared/ui/search-input';
import { PassengersTable } from './passengers-table';
import { usePassengersStore } from '../../store';
import { filterPassengers } from '../../shared/lib';
import { fetchPassengersData } from '../../shared/api';

function PassengerList() {
    const {
        passengers,
        setPassengers,
        displayedPassengers,
        setDisplayedPassengers,
        searchQuery,
        setSearchQuery,
        visibleCount,
        setVisibleCount,
    } = usePassengersStore();

    const [waiting, setWaiting] = useState(true);

    const fetchPassengers = useCallback(async () => {
        setWaiting(true);

        try {
            const data = await fetchPassengersData();
            setPassengers(data);
        } catch (error) {
            throw new Error(`Ошибка при загрузке данных: ${error}`);
        } finally {
            setWaiting(false);
        }
    }, [setPassengers]);

    useEffect(() => {
        fetchPassengers();
    }, [fetchPassengers]);

    const handleSearch = () => {
        const filtered = filterPassengers(passengers, searchQuery, visibleCount);
        setDisplayedPassengers(filtered);
    };

    const displayedPassengersMemo = useMemo(() => {
        if (searchQuery.trim()) {
            return filterPassengers(passengers, searchQuery, visibleCount);
        }
        return passengers.slice(0, visibleCount);
    }, [passengers, visibleCount]);

    useEffect(() => {
        setDisplayedPassengers(displayedPassengersMemo);
    }, [displayedPassengersMemo, setDisplayedPassengers]);

    return (
        <div className={styles.container}>
            <div className={styles.blockSearch}>
                <SearchInput value={searchQuery} setValue={setSearchQuery} waiting={waiting} onClick={handleSearch} />
                <Button title="SEARCH" waiting={waiting} onClick={handleSearch} />
            </div>

            {
                waiting ? <div style={{ marginTop: 20 }}>loading...</div> : (
                    <PassengersTable
                        passengers={displayedPassengers}
                        searchQuery={searchQuery}
                        visibleCount={visibleCount}
                        setVisibleCount={setVisibleCount}
                    />
                )
            }
        </div>
    );
}

export default PassengerList;
