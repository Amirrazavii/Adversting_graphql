import express from 'express';
import { buildApp } from './app';
import 'dotenv/config';
import {authenticateUser} from './utiles/authenticateUser';
import router from "./router/index"
import cors from "cors"

const app = express();

const Port =process.env.PORT

const endpoint = buildApp(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Define the CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your desired origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the HTTP methods you want to allow
  optionsSuccessStatus: 204, // Special status code for preflight requests
  Credential: true
};

// Use the cors middleware with the defined options
app.use(cors(corsOptions));
app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'));

app.use("/upload",router)
app.listen(Port, () => {

  console.log(`GraphQL API located at http://localhost:${Port}${endpoint}`);
});