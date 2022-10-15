export const isServerSide = typeof window === "undefined";

export const origin = isServerSide ? process.env.HOST : window.location.origin;
