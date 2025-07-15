import { Passenger } from '../api';

export const filterPassengers = (
    passengers: Passenger[],
    searchQuery: string,
    visibleCount: number,
) => {
    if (!searchQuery.trim()) {
        return passengers.slice(0, visibleCount);
    }

    const queryParts = searchQuery.toLowerCase().split(' ');
    const fullQuery = searchQuery.toLowerCase();

    return passengers
        .filter((p) => {
            let hasSurvivedCondition = false;
            let hasNotCondition = false;

            const isFullNameMatch = p.name.toLowerCase() === fullQuery;

            const matches = queryParts.every((part) => {
                if (part === 'survived') {
                    hasSurvivedCondition = true;
                    return true;
                }
                if (part.startsWith('not')) {
                    hasNotCondition = true;
                    return true;
                }
                if (p.name.toLowerCase().includes(part)) return true;
                if (p.gender.toLowerCase().includes(part)) return true;
                if (p.age !== null && p.age.toString().includes(part)) return true;
                return false;
            });

            if (hasSurvivedCondition && hasNotCondition) {
                return !p.survived;
            }
            if (hasSurvivedCondition) {
                return p.survived;
            }
            if (hasNotCondition) {
                return !p.survived;
            }

            if (isFullNameMatch) {
                return true;
            }

            return matches;
        })
        .slice(0, visibleCount);
};
