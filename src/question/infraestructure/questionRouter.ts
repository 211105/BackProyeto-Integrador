import express from "express";
import {createQuestionController, getAllQuestionController  } from "./dependecies";

export const questionRoutes = express.Router();

questionRoutes.post('/',createQuestionController.post.bind(createQuestionController));

questionRoutes.get('/',getAllQuestionController.get.bind(getAllQuestionController));












