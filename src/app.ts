import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';
import * as serviceAccount from "./helpers/integrador-9.json";
import * as admin from "firebase-admin";
import fileUpload from 'express-fileupload';
import { activitRoutes } from "./activity/infraestructure/activityRouter";


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




app.use('/api/v1/activitys',activitRoutes)



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
