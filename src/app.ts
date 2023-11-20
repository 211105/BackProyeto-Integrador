import express from "express";
import cors from "cors";
import "dotenv/config";
import { Signale } from 'signale';
import { userRoutes } from "./user/infraestructure/userRouter";
import * as serviceAccount from "./helpers/integrador-9.json";
import * as admin from "firebase-admin";
import fileUpload from 'express-fileupload';
import { markRouter } from "./marks/infraestructura/markRoutes";


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




app.use('/api/v1/users', userRoutes);
app.use('/api/v1/pins', markRouter);



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
