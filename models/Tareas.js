const mongoose = require('mongoose')

const TareasSchema = new mongoose.Schema({
  tarea: {
    type: String,
    required: true,
  },
  completa: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Tareas', TareasSchema)