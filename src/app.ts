  import express from "express";
  import cors from "cors";
  import "dotenv/config";
  import { Signale } from 'signale';
  import * as serviceAccount from "./helpers/integrador-9.json";
  import * as admin from "firebase-admin";
  import fileUpload from 'express-fileupload';
  import { createProxyMiddleware } from "http-proxy-middleware";
  import { Request, Response } from "express";
  import { createLogger, format, transports } from 'winston';
  import proxy from 'express-http-proxy';

  

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "integrador-ff8cd.appspot.com/"
  });

  const app = express();  
  app.use(fileUpload());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));


  app.get('/rutine',(req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})

  app.use('/user-service',proxy('https://user.cristilex.com/api/v1/users'));
  app.use('/mark-service',proxy('https://mark.cristilex.com'));
  app.use('/note-service',proxy('https://note.cristilex.com'));
  app.use('/file-service',proxy('https://file.cristilex.com'));
  app.use('/weeklyAmoun-service',proxy('https://mount.cristilex.com'));
  app.use('/expenses-service',proxy('https://expense.cristilex.com'));


  const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
