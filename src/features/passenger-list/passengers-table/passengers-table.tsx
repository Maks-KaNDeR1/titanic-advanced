import React, { useRef, useEffect } from 'react';
import styles from './passengers-table.module.scss';
import { Passenger } from '../../../shared/api';
import { highlightText } from '../../../shared/lib';

interface PassengersTableProps {
    passengers: Passenger[];
    searchQuery: string;
    visibleCount: number;
    setVisibleCount: (count: number) => void;
}

export function PassengersTable({
    passengers,
    searchQuery,
    visibleCount,
    setVisibleCount,
}: PassengersTableProps) {
    const tableRef = useRef<HTMLDivElement | null>(null);
    const queryParts = searchQuery.trim().toLowerCase().split(' ').filter(Boolean);
    const rowHeight = 60;

    const handleScroll = () => {
        if (tableRef.current) {
            const scrollTop = tableRef.current.scrollTop + tableRef.current.clientHeight + 10;
            const bottom = tableRef.current.scrollHeight <= scrollTop;

            if (bottom) {
                setVisibleCount(visibleCount + 10);
            }
        }
    };

    useEffect(() => {
        const windowHeight = window.innerHeight - 72;

        const requiredVisibleCount = Math.ceil(windowHeight / rowHeight);

        if (requiredVisibleCount > visibleCount) {
            setVisibleCount(visibleCount + 10);
        }

        const tableElement = tableRef.current;
        if (tableElement) {
            tableElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (tableElement) {
                tableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [visibleCount]);

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableContainerWrapper} ref={tableRef}>
                {passengers.slice(0, visibleCount).map((p) => (
                    <div key={p.id} className={styles.passengersRow}>
                        <div className={styles.row1}>
                            <div className={styles.firstRow}>
                                <span className={styles.name}>
                                    {highlightText(p.name, queryParts)}
                                </span>

                                <span className={styles.gender}>
                                    {highlightText(p.gender === 'male' ? 'M' : 'F', queryParts)}
                                </span>
                            </div>

                            <div className={styles.secondRow}>
                                <span className={p.survived ? styles.survived : styles.notSurvived}>
                                    {p.survived ? 'SURVIVED' : 'NOT SURVIVED'}
                                </span>

                                <span className={styles.age}>
                                    {highlightText(`${p.age?.toFixed(0) ?? '?'}`, queryParts)}
                                    {' '}
                                    y
                                </span>
                            </div>
                        </div>

                        <div className={styles.row2}>
                            <div className={styles.ticket}>
                                Ticket:
                                {' '}
                                {p.ticket}
                            </div>

                            <div className={styles.cabin}>
                                Cabin:
                                {' '}
                                {p.cabin ?? '?'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
