var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Duelistas = require('../models').Duelistas;
var Decks = require('../models').Decks;

/* Comprando um duelista */
router.post('/comprar_duelista', function(req, res, next) {

    var idUsuario = sessionStorage.getItem('id_usuario_meuapp');

	Duelistas.create({
		idDuelista: ,
		fkUsuario: idUsuario
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});

});

/* Comprando um deck */
router.post('/comprar_deck', function(req, res, next) {

    var idUsuario = sessionStorage.getItem('id_usuario_meuapp');

	Decks.create({
		idDeck: ,
		fkUsuario: idUsuario
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
	
});

/* Checando quais duelistas o usuário possui */
router.post('/validar_duelistas', function(req, res, next) {

    var idUsuario = sessionStorage.getItem('id_usuario_meuapp');
	
	let instrucaoSql = `select idDuelista from duelistas where fkUsuario = '${idUsuario}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Checando quais decks o usuário possui */
router.post('/validar_decks', function(req, res, next) {

    var idUsuario = sessionStorage.getItem('id_usuario_meuapp');
	
	let instrucaoSql = `select idDeck from decks where fkUsuario = '${idUsuario}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;
