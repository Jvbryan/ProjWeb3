const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email é requerido!'],
    min: [3, 'Email >= 3 caracteres!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória!'],
    min: [3, 'Senha >= 3 caracteres!'],
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);