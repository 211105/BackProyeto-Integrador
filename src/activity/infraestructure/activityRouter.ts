import express from "express";
import { addActivityController, deleteActivityController, listActivitysController, updateActivityControllr } from "./dependencies";

export const activitRoutes  = express.Router();


activitRoutes.post("/", addActivityController.run.bind(addActivityController))

activitRoutes.delete("/",deleteActivityController.run.bind(deleteActivityController))

activitRoutes.put("/",updateActivityControllr.run.bind(updateActivityControllr))

activitRoutes.get("/",listActivitysController.run.bind(listActivitysController))
