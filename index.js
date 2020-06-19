import express from 'express';
import promiseRouter from 'express-promise-router';
import ApiRouter from './routes';
import bodyParser from 'body-parser';


import App from './libs/App';
import config from './dist/config';
const router = promiseRouter();
import cors from 'cors';

const app = express()
.use(bodyParser.json())
.use(bodyParser.urlencoded({
  extended: true
}))
.use(cors({
  credentials: true,
  origin: (origin,  callback) => callback(null, true)
}))
.use(router);

ApiRouter(router);

const PORT = process.env.PORT || 3100;

const services = new App({ config });
services.init();

const server = app.listen(PORT, () => {
  console.log("Server listening at port %s", server.address().port);
})