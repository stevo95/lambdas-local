export const diceRoll = (): number => {
    return Math.floor(Math.random() * 6) + 1;
}

export const capitalize = (str: string): string => {
    return str.toUpperCase();
}