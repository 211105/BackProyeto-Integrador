import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';
import * as serviceAccount from "./helpers/integrador-9.json";
import * as admin from "firebase-admin";
import fileUpload from 'express-fileupload';
import { activitRoutes } from "./activity/infraestructure/activityRouter";


admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID || 'default_project_id',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'default_client_email',
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || 'default_private_key').replace(/\\n/g, '\n'),
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'default_storage_bucket'
});


const app = express();
const signale = new Signale();


app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/api/v1/activitys',activitRoutes)



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
