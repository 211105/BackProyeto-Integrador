  import express from "express";
  import cors from "cors";
  import "dotenv/config";
  import { Signale } from 'signale';
  import * as serviceAccount from "./helpers/integrador-9.json";
  import * as admin from "firebase-admin";
  import fileUpload from 'express-fileupload';
  import { createProxyMiddleware } from "http-proxy-middleware";
  import { Request, Response } from "express";


  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "integrador-ff8cd.appspot.com/"
  });

  const app = express();
  const signale = new Signale();


  app.use(fileUpload());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const proxyOptionsUser = {
    target: 'https://user.cristilex.com', // URL del servicio al que quieres redirigir
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/users': '', // Reescribe la ruta
    },
  };

  const proxyOptionsAuth = {
    target: 'https://user.cristilex.com', // URL del servicio al que quieres redirigir
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/users/auth': '', // Reescribe la ruta
    },
  };

  const proxyOptionsMark = {
    target: 'https://mark.cristilex.com', // URL del servicio al que quieres redirigir
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/pins': '', // Reescribe la ruta
    },
  };

  const proxyOptionsNote = {
    target: 'https://note.cristilex.com', // URL del servicio al que quieres redirigir
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/notes': '', // Reescribe la ruta
    },
  };

  const proxyOptionsFile = {
    target: 'https://file.cristilex.com', // URL del servicio al que quieres redirigir
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/files': '', // Reescribe la ruta
    },
  };

  const proxyOptionsWeekyAmount = {
    target: 'https://mount.cristilex.com', // URL del servicio al que quieres redirigir
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/weeklyAmoun': '', // Reescribe la ruta
    },
  };
  const proxyOptionsExpense = {
    target: 'https://expense.cristilex.com', // URL del servicio al que quieres redirigir
    changeOrigin: true,
    pathRewrite: {
      '^/api/v1/expenses': '', // Reescribe la ruta
    },
  };



  app.get('/rutine',(req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutada con éxito');
})
  app.use('/api/v1/users', createProxyMiddleware(proxyOptionsUser))
  app.use('/api/v1/users/auth', createProxyMiddleware(proxyOptionsAuth)) //validar todas con tokens menos esta
  app.use('/api/v1/pins/', createProxyMiddleware(proxyOptionsMark))
  app.use('/api/v1/notes', createProxyMiddleware(proxyOptionsNote))
  app.use('/api/v1/files', createProxyMiddleware(proxyOptionsFile))
  app.use('/api/v1/weeklyAmoun', createProxyMiddleware(proxyOptionsWeekyAmount))
  app.use('/api/v1/expenses', createProxyMiddleware(proxyOptionsExpense))




  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
  });
