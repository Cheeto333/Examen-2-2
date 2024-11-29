import { Router } from "express";
import { getAllejemploController, 
    getIdejemplosControlers, 
    postEjemploController, 
    putEjemploController, 
    deleteEjemploController 
} from "../controllers/ejemplo.controllers.js";

const ejemplo = Router();

ejemplo.get('/', getAllejemploController)

ejemplo.get('/:id', getIdejemplosControlers)

ejemplo.put('/:id', putEjemploController)

ejemplo.post('/', postEjemploController)

ejemplo.delete('/:id', deleteEjemploController)

export default ejemplo;