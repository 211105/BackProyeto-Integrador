import express, {Application} from 'express';
import proxy from 'express-http-proxy';

import dotenv from 'dotenv';
import { Signale } from "signale";

const app:Application = express();
const signale = new Signale();


dotenv.config();
const PORT = process.env.PORT || 3000;

app.use('/api/v1/users',proxy('https://user.cristilex.com'))
app.use('/api/v1/users',proxy('https://mark.cristilex.com'));
app.use('/api/v1/users',proxy('https://note.cristilex.com'));
app.use('/api/v1/users',proxy('https://file.cristilex.com'));
app.use('/api/v1/users',proxy('https://mount.cristilex.com'));
app.use('/api/v1/users',proxy('https://expense.cristilex.com'));



app.listen(PORT,() => {
  signale.success(`Servidor corriendo en http://localhost:${PORT}`);
});