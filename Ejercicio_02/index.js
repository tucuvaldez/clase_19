// Importar nuestras dependencias

import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    dni: { type: String, unique: true },
})

const usuarioModel = mongoose.model('usuario', usuarioSchema)
//Configurar mongoose para no mostrar warning de protocolos deprecados

mongoose.set('strictQuery', true)


// Conectarse a la base de datos de usuarios

try {
    await mongoose.connect('mongodb+srv://admin:coderhouse@cluster0.ory38z3.mongodb.net/?retryWrites=true&w=majority', {
        serverSelectionTimeoutMS: 5000,
    })
    console.log('Base de datos conectada con exito')

    try {
        //Escritura de base de datos de usuarios
        const usuarioNuevo = new usuarioModel({ nombre: 'Feredico', apellido: 'Perez', dni: '34501380' })
        await usuarioNuevo.save()
        console.log('Usurario agregado')

        //Listar usuario representandolos en consola
        let usuarios = await usuarioModel.find({})
        usuarios.forEach(usuario => {
            console.log(JSON.stringify(usuario))
        })
    } catch (err) { console.log(err) }
} catch (err) { console.log(err) }

