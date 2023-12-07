import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';
import * as serviceAccount from "./helpers/integrador-image-firebase-adminsdk-17aek-114f65daa8.json";
import * as admin from "firebase-admin";
import fileUpload from 'express-fileupload';
import { expenseRouter } from "./expense/infraestructure/expenseRoutes";



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "integrador-image.appspot.com"
});

const app = express();
const signale = new Signale();


app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expenseRouter);




const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
