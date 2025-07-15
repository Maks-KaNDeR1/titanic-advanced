import React from 'react';

export const highlightText = (text: string | number | null | undefined, queryParts: string[]): JSX.Element[] => {
    if (!text) return [<span key="empty">{String(text ?? '?')}</span>];
    const lowerText = String(text).toLowerCase();
    let lastIndex = 0;
    const result: JSX.Element[] = [];

    queryParts.forEach((part) => {
        const index = lowerText.indexOf(part);
        if (index !== -1) {
            if (lastIndex < index) {
                result.push(<span key={lastIndex}>{String(text).slice(lastIndex, index)}</span>);
            }

            result.push(
                <span key={index} className="highlight">
                    {String(text).slice(index, index + part.length)}
                </span>,
            );
            lastIndex = index + part.length;
        }
    });

    if (lastIndex < lowerText.length) {
        result.push(<span key={lastIndex}>{String(text).slice(lastIndex)}</span>);
    }

    return result.length > 0 ? result : [<span key="full">{String(text)}</span>];
};
