import express from 'express';
import { buildApp } from './app';
import 'dotenv/config';
import {authenticateUser} from './utiles/authenticateUser';

const app = express();

const Port =process.env.PORT

const endpoint = buildApp(app);

// authenticateUser().then((data)=>console.log(data)
// )
app.listen(Port, () => {
  
  

  console.log(`GraphQL API located at http://localhost:${Port}${endpoint}`);
});