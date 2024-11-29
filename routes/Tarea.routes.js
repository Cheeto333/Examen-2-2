import { Router } from "express";
import { deleteTarea, getAllTareas, getIdTarea, postTarea, putTarea } from "../controllers/Tarea.controller.js";



const tareas = Router();

tareas.get('/', getAllTareas)
tareas.get('/:id', getIdTarea)
tareas.post('/', postTarea)
tareas.put('/:id', putTarea)
tareas.delete('/:id', deleteTarea)

export default tareas