import express from 'express';
import { buildApp } from './app';
import 'dotenv/config';

const app = express();

const Port =process.env.PORT

const endpoint = buildApp(app);

app.listen(Port, () => {
  console.log(`GraphQL API located at http://localhost:${Port}${endpoint}`);
});