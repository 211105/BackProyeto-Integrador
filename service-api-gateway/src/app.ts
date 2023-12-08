import express, {Application} from 'express';
import proxy from 'express-http-proxy';

import dotenv from 'dotenv';
import { Signale } from "signale";

const app:Application = express();
const signale = new Signale();
import { Request, Response } from "express";


dotenv.config();
const PORT = process.env.PORT || 3000;
app.get('/rutine', (req: Request, res: Response) => {
  res.status(200).send('Rutina ejecutada con éxito');
})
app.use('/api/v1/users',proxy('http://localhost:3005'))
app.use('/api/v1/marks',proxy('http://localhost:3003'));
app.use('/api/v1/notes',proxy('http://localhost:3004'));
app.use('/api/v1/files',proxy('http://localhost:3002'));
app.use('/api/v1/mount',proxy('http://localhost:3006'));
app.use('/api/v1/expense',proxy('http://localhost:3001'));



app.listen(PORT,() => {
  signale.success(`Servidor corriendo en http://localhost:${PORT}`);
});