import ejemplo from "./ejemplo.js"; 
import { Router } from "express";
import tareas from "./Tarea.routes.js";

const indexRouter = Router();

indexRouter.use('/ejemplo', ejemplo);
indexRouter.use('/tareas', tareas)

export default indexRouter;
