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

const estudiantesDAO = mongoose.model('estudiantes', estudianteSchema)

//Conexion a la base de datos

await mongoose.connect('mongodb://127.0.0.1/colegio', {
    serverSelectionTimeoutMS: 5000,
})
console.log('Base de datos conectada');

try {
    console.log('Actualizar DNI de Lucas Blanco')
    let rta = await estudiantesDAO.updateOne({
        nombre: 'Lucas',
        apellido: 'Blanco'
    }, { $set: { dni: 20355875 } })
    console.log(rta)

    //Punto 2: Agregar un campo 'ingreso' a todos los documentos con el valor false
    console.log('Agregar campo de ingreso a documentos con valor false')
    //rta = await estudiantesDAO.updateMany({}, {ingreso: false})
    rta = await estudiantesDAO.updateMany({}, { $set: { ingreso: false } })
    console.log(rta)

    //Punto 3: Modificar el valor ingreso a true para todos los estudiantes del curso 1A
    rta = await estudiantesDAO.updateMany({ curso: '1A' }, { $set: { ingreso: true } })
    console.log(rta)

    //Punto 4: Listar los estudiantes que aprobaron (de 4 en adelante) sin los campos id y v
    const estudiantesAprobados = await estudiantesDAO.find({ nota: { $gte: 4 } }, { _id: 0, __v: 0 })
    estudiantesAprobados.forEach(estApr => {
        console.log(JSON.stringify(estApr))
    })

    //Punto 5: Listar estudiantes que posean el campo ingreso en true sin los de ID y V

    const estudiantesIngresados = await estudiantesDAO.find({ ingreso: true }, { _id: 0, __v: 0 })
    estudiantesIngresados.forEach(estIngres => {
        console.log(JSON.stringify(estIngres))
    })

    //Punto 6: Borrar de la coleccion de estudiantes los que posean el ingreso true

    rta = await estudiantesDAO.deleteMany({ ingreso: true })
    console.log(rta)

    //Punto 7: Listar el contenidode la coleccion estudiantes con el campo __: 0
    let estudiantes = await estudiantesDAO.find({}, { __v: 0 })
    estudiantes.forEach(estudiante => {
        console.log(
            JSON.stringify(estudiantes),
            '-> Fecha de Creacion: ',
            new Date(estudiante._id.getTimestamp()).toLocaleDateString()
        )
    })

} catch (err) {
    console.log('Error en el proceso de base datos', err);
} finally {
    await mongoose.disconnect()
}





