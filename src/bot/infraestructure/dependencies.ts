import { ApiChatGpt } from "./apiChatGpt";

import { ConsultationPromUseCase } from "../application/consultationPromUseCase";
import { ConsultationPromController } from "./controllers/consultationPromController";


export const apiChatGpt = new ApiChatGpt();

export const consultationPromUseCase = new ConsultationPromUseCase(apiChatGpt);
export const consultationPromController = new ConsultationPromController(consultationPromUseCase);

