import React from 'react';
import styles from './search-input.module.scss';

interface SearchInputProps {
    value: string,
    setValue: (value: string) => void
    waiting: boolean;
    onClick: () => void;
}

export function SearchInput({
    value,
    setValue,
    waiting,
    onClick,
}: SearchInputProps) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !waiting) {
            onClick();
        }
    };

    return (
        <input
            type="text"
            placeholder="Lind"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
        />
    );
}
