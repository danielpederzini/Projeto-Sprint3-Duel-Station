process.env.NODE_ENV = 'production'; // altere para 'production' ou 'dev'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var partidasRouter = require('./routes/partidas');
var comprasRouter = require('./routes/compras');
var postsRouter = require('./routes/posts');

var app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/partidas', partidasRouter);
app.use('/compras', comprasRouter);
app.use('/posts', postsRouter);

module.exports = app;
