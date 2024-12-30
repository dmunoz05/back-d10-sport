import dotenv from 'dotenv';
dotenv.config();

export const variablesDB = ({
  railway: process.env.RAILWAY,
  academy: process.env.ACADEMY,
  landing: process.env.LANDING
})