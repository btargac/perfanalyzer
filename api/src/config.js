export const config = {
  // Node.js app related
  port: process.env.PORT || 3001,

  // DB related
  db: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '27017',
    DATABASE: process.env.DB_NAME || 'perfanalyzer',
  },
};
