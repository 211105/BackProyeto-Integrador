import { AddActivityUseCase } from "../application/addActivityUseCase"
import { DeleteActivityUseCase } from "../application/deleteActivityUseCase";
import { ListActivitysUseCase } from "../application/listActyvitiysUseCase";
import { UpdateActivityUseCase } from "../application/updateActivityUseCase";
import { AddActivityController } from "./controllers/addActivityController";
import { DeleteActivityController } from "./controllers/deleteActivityController";
import { ListActivitysController } from "./controllers/listActivitysController";
import { UpdateActivityByIdController } from "./controllers/updateActivityController";
import { MysqlActivityRepository } from "./mysqlActivityRepository"

export const mysqActivityRepository = new MysqlActivityRepository()

export const addActivityUseCase = new AddActivityUseCase(mysqActivityRepository);
export const addActivityController = new AddActivityController(addActivityUseCase);


export const deleteActivityUseCase = new DeleteActivityUseCase(mysqActivityRepository);
export const deleteActivityController = new DeleteActivityController(deleteActivityUseCase);

export const updateActivityUseCase = new UpdateActivityUseCase(mysqActivityRepository);
export const updateActivityControllr = new UpdateActivityByIdController(updateActivityUseCase);

export const listActivitysUseCase = new ListActivitysUseCase(mysqActivityRepository);
export const listActivitysController = new ListActivitysController(listActivitysUseCase);