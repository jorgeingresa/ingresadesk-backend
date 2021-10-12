import express from 'express';
import cors from 'cors';
import { router as systems } from './systems';
import { router as medias } from './medias';
import { router as download } from './download';
import { getServerConfig } from '../config';

const config = getServerConfig();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use('/systems', systems);
app.use('/medias', medias);
app.use('/download', download);

export function startAPI() {
  app.listen(config.PORT, config.HOSTNAME, () => {
    console.log(`listening on ${config.HOSTNAME}:${config.PORT}`);
  });
}
