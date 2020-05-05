import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { config } from './config';
import metrics from './routes/metrics';

const {
  db: { USER, PASSWORD, HOST, PORT, DATABASE },
} = config || {};

const dbUrl =
  process.env.NODE_ENV === 'production'
    ? `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`
    : `mongodb://${HOST}:${PORT}/${DATABASE}`;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

const app = express();
app.use(morgan('tiny'));
app.use(
  helmet({
    frameguard: false,
  })
);
// parse text/html bodies
app.use(bodyParser.text());

// handle post data for metrics & enable cors for all domains
app.use('/metrics', cors(), metrics);

// Error handling
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));

  res.status(err.status || 500);
  res.end();
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, err => {
    if (err) {
      console.error(`Error on app initialization ${err}`);
    }
    console.info(`Running at http://localhost:${config.port}/`);
  });
}

export { app, db };
