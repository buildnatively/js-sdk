export const generateID = () =>
    Date.now().toString(36) + Math.random().toString(36).substring(2);
