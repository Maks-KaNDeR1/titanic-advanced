import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  title: string;
  waiting: boolean;
  onClick: () => void;
}

export function Button({ title, waiting, onClick }: ButtonProps) {
    return (
        <button
            type="button"
            className={styles.button}
            onClick={onClick}
            disabled={waiting}
        >
            {title}
        </button>
    );
}
