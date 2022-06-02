export const URL: string =
  process.env.NODE_ENV === "production"
    ? "https://faculty-takehome-christian.netlify.app/"
    : "http://localhost:3000/";
