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
  db: { HOST, PORT, DATABASE },
} = config || {};

mongoose.connect(`mongodb://${HOST}:${PORT}/${DATABASE}`, {
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
// parse application/json bodies
app.use(bodyParser.json());

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

app.listen(config.port, err => {
  if (err) {
    console.error(`Error on app initialization ${err}`);
  }
  console.info(`Running at http://localhost:${config.port}/`);
});