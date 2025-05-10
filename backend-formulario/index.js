const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/formularioDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Esquema y modelo
const FormSchema = new mongoose.Schema({
  user_name: String,
  user_mail: String,
  user_message: String
});

const FormModel = mongoose.model('Formulario', FormSchema);

// Ruta para manejar POST del formulario
app.post('/my-handling-form-page', async (req, res) => {
  try {
    const nuevoFormulario = new FormModel(req.body);
    await nuevoFormulario.save();
    res.status(200).send('Formulario guardado exitosamente.');
  } catch (err) {
    res.status(500).send('Error al guardar el formulario.');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
