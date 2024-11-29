import mongoose from "mongoose";
import Tarea from '../modules/Tarea.model.js'


export const getAllTareas = async (req, res) =>{
    console.log('Mostrando toda la lista de productos'.grey)
    try {
        const tareas = await Tarea.find({},{_v:0})
        if(tareas.length === 0){
            return res.status(404).json({
                msg:'No hay elementos dentro de la lista'
            })
        }

        return res.status(200).json({
            tareas
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const getIdTarea = async (req, res) => {
    console.log('Trayendo los elementos por id'.grey)
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                error: 'Id no falido'
            })
        }

        const tareas = await Tarea.findById(id);
        if(!tareas){
            return res.status(404).json({
                error: 'No se ha encontrado elementos con ese id'
            })
        }

        return res.status(200).json({
            tareas
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const postTarea = async(req, res) => {
    console.log('Agregando elementos a la base de datos'.grey)

    const body = req.body
    const newTarea = new Tarea(body)
    try {
        const validarError = newTarea.validateSync();
        if(validarError){
            const errorMesage = Object.values(validarError.errors).map(error => error.message)
            return res.status(404).json({
                errorMesage
            })
        }

        await newTarea.save();
        return res.status(200).json({
            msg: 'Se ha agregado nuevo elemento',
            newTarea
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const putTarea = async(req, res) => {
    console.log('Actualizando elemento'.blue)
    const body = req.body
    const id = req.params.id
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                error: 'Id no falido'
            })
        }
        const tareas = await Tarea.findByIdAndUpdate(id, body, {new:true, runValidators:true})
        if(!tareas){
            return res.status(404).json({
                error: 'No se ha encontrado elementos con ese id'
            })
        }
        return res.status(200).json({
            msg: 'Elemento actualizado',
            tareas
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const deleteTarea = async(req, res) =>{
    console.log('Eliminando elemento')
    const id = req.params.id

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                error: 'Id no falido'
            })
        }

        const deleteElement = await Tarea.findByIdAndDelete(id)

        if(!deleteElement){
            return res.status(404).json({
                error: 'No se ha encontrado elementos con ese id'
            })
        }

        return res.status(200).json({
            msg: 'Elemento eliminado',
            deleteElement
        })
    } catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}