import Ejemplo from "../modules/ejemplo.module.js";
import mongoose from "mongoose";
import express from 'express'

export const getAllejemploController = async (req, res) => {
    console.log('obtiene todos los ejemplos')

    try{
        const ejemplo = await Ejemplo.find({},{__v:0})
        if(ejemplo.length === 0){
            return res.status(404).json({
                msg: 'no se ha encontrado ejemplos'
            })
        }

        return res.status(200).json({
            ejemplo
        })
    }catch(error){
        res.status(500).json({
            msg: 'error no se ha posido mostrar los elementos'
        })
    }
}

export const getIdejemplosControlers = async (req, res) =>{
    console.log('Trayendo los elemntos por id')
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({
                msg: 'ID no valido'
            })
        }

        const ejemplo = await Ejemplo.findById(id)
        if(!ejemplo){
            return res.status(404).json({
                msg: 'no se ha encontrado ejemplos'
            })
        }
        return res.status(200).json({
            ejemplo
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener un ejemplo'
        })
    }
}

export const postEjemploController = async (req, res) => {
    console.log('Subiendo datos a la base de datos')
    const body = req.body;
    const ejemplo = new Ejemplo(body);

    try {
        const validationError = ejemplo.validateSync();
        if(validationError){
            const errorMessage = Object.values(validationError.errors).map(error => error.message)
            return res.status(404).json({
                msg: errorMessage
            })
        }

        await ejemplo.save();
        return res.status(201).json({
            ejemplo
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al ingresar un ejemplo'
        })
    }
} 

export const putEjemploController = async (req, res) => {
    console.log('Actualizando elementos')
    const body = req.body;
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({
                msg: 'ID no valido'
            })
        }
        const ejemplo = await Ejemplo.findByIdAndUpdate(id, body, {new:true, runValidators:true})
        if(!ejemplo){
            return res.status(404).json({
                msg: 'no se ha podido actualizar ejemplos'
            })
        }

        return res.status(200).json({
            ejemplo
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al ingresar un ejemplo'
        })
    }
}

export const deleteEjemploController = async (req, res) => {
    console.log('Eliminando elemento por id')
    const id = req.params.id
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400).json({
                msg: 'ID no valido'
            })
        }
        const ejemplo = await Ejemplo.findByIdAndDelete(id)
        if(!ejemplo){
            return res.status(404).json({
                msg: 'no se ha podido eliminar el elemento'
            })
        }
        return res.status(200).json({
            msg: 'Elemento eliminado'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al ingresar un ejemplo'
        })
    }
}