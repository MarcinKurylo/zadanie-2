import express, { Express, } from 'express';
import mongoose from 'mongoose';
import { router } from './router';


const app: Express = express();

app.use(express.json())
const port = 3000;

app.use(router)

mongoose.connect('mongodb://host.docker.internal:27017/recipe')
.then(_res => console.log('connected to mongo'))
.catch(e => `Error: ${e}`)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});