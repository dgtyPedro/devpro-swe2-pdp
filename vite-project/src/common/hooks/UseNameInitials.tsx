export const useNameInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/); // Remove espaços extras e divide o nome por espaços

    if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    } else {
        return parts[0].substring(0, 2).toUpperCase();
    }
};
