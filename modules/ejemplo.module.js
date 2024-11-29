import mongoose from "mongoose";

const ejemploScalla = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    apellido:{
        type: String,
        required: true
    },

    edad:{
        type: Number,
        required: false
    },

    contacto:{
        type: [String],
        required: false
    }
})

const Ejemplo = mongoose.model('ejemplo', ejemploScalla)

export default Ejemplo;