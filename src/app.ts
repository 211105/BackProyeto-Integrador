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
app.use('/api/v1/users',proxy('https://user.cristilex.com'))
app.use('/api/v1/marks',proxy('https://mark.cristilex.com'));
app.use('/api/v1/notes',proxy('https://note.cristilex.com'));
app.use('/api/v1/files',proxy('https://file.cristilex.com'));
app.use('/api/v1/mount',proxy('https://mount.cristilex.com'));
app.use('/api/v1/expense',proxy('https://expense.cristilex.com'));



app.listen(PORT,() => {
  signale.success(`Servidor corriendo en http://localhost:${PORT}`);
});