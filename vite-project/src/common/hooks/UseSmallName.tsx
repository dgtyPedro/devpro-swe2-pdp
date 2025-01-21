export const useSmallName = (name: string): string => {
    return name.split(' ').slice(0, 2).join(' ')
};
