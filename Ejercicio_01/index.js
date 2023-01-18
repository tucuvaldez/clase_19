// Importar dependencias

import mongoose from "mongoose";

//Instanciamos nuestro schema
const Schema = mongoose.Schema

//Definimos el esuqema de documento y del modelo par poder interactuar con la base de datos (CRUD)

const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    dni: { type: String, required: true, unique: true },
    curso: { type: String, required: true },
    nota: { type: Number, required: true },
    //Agregar al schema actual
    ingreso: { type: Boolean, required: true }
})

const estudianteDAO = mongoose.model('estudiantes', estudianteSchema)

//Conexion a la base de datos

await mongoose.connect('mongodb://127.0.0.1/colegio', {
    serverSelectionTimeoutMS: 5000,
})
console.log('Base de datos conectada');

try {
    console.log('Actualizar DNI de Lucas Blanco')
    let rta = await estudianteDAO.updateOne({
        nombre: 'Lucas',
        apellido: 'Blanco'
    }, { $set: { dni: 20355875 } })
    console.log(rta)
} catch { console.error(err); }