const express = require('express');
const multer = require('multer');

const verificaSession = require('./middlewares/verificaSession');
const Usuario = require('./controllers/usuario');
const Post = require('./controllers/post');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './thumbnails')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const app = express();
const upload = multer({ storage: storage });

////////////////// VIEWS //////////////////////

app.get('/', function (req, res) {
  res.redirect('/views/index.html');
})

//Número de visualizações do index.html
app.get('/visualizacoes', function (req, res) {
  res.status(200).json(req.session.views['/views/index.html']);
})

app.get('/num_post', function (req, res) {
  res.status(200).json(req.session.num_post);
})

////////////////// SESSIONS //////////////////
//Verifica se uma sessão é válida e retorna flag de administrador
app.get('/usuario_logado', verificaSession, function (req, res) {
  res.status(200).json(req.session.user.admin);
})
app.get('/usuario_logout', verificaSession, function (req, res) {
  req.session.destroy();
  res.redirect('/views/index.html');
})

app.post('/usuario/login', Usuario.login);

app.post('/usuario/cadastrar', Usuario.cadastrar);

app.get('/posts', verificaSession, Post.postagens);

app.post('/posts/novopost', verificaSession, upload.single('thumbnail'), Post.novopost);

module.exports = app;