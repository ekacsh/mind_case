import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { authRouter, usersRouter } from './routers/index.js';

/* Inicializando dotenv */
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';
const PORT = process.env.PORT || 3000;

/* Inicializando Mongoose */
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB database.');
});

/* Inicializando express */
const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};
// app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Backend');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on port ${PORT}`);
});
