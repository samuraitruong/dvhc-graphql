export const CONSTANST = {
  CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || '',
  PORT: parseInt(process.env.PORT as string, 10) || 5000,
  DB_NAME: process.env.DB_NAME || 'dvhc',
};
