export const config = {
  // Node.js app related
  port: process.env.PORT || 3001,

  // DB related
  db: {
    USER: process.env.DB_USER || 'user',
    PASSWORD: process.env.DB_PASSWORD || 'password',
    HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '27017',
    DATABASE: process.env.DB_NAME || 'perfanalyzer',
  },
};
