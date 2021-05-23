var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var Duelistas = require('../models').Duelistas;
var Decks = require('../models').Decks;

/* Comprando um duelista */
router.post('/comprar_duelista/:item_selecionado/:valor/:idUsuario/:saldo', function(req, res, next) {

	var idDuelista = req.params.item_selecionado;
	var valor = Number(req.params.valor);
	var fkUsuario = req.params.idUsuario;
	var saldo = Number(req.params.saldo);

	saldo -= valor;

	Duelistas.create({
		idDuelista: idDuelista,
		fkUsuario: fkUsuario
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});

	let instrucaoSql = `update usuario set saldo="${saldo}" where idUsuario="${fkUsuario}"`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.UPDATE });

});

/* Comprando um deck */
router.post('/comprar_deck/:item_selecionado/:valor/:idUsuario/:saldo', function(req, res, next) {
	
	var idDeck = req.params.item_selecionado;
	var valor = Number(req.params.valor);
	var fkUsuario = req.params.idUsuario;
	var saldo = Number(req.params.saldo);

	saldo -= valor;
	
	Decks.create({
		idDeck: idDeck,
		fkUsuario: fkUsuario
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});

	let instrucaoSql = `update usuario set saldo="${saldo}" where idUsuario="${fkUsuario}"`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.UPDATE });
	
});


/* Checando quais duelistas o usuário possui */
router.get('/validar_duelistas/:idUsuario', function(req, res, next) {
	
	var idUsuario = req.params.idUsuario;
	
	let instrucaoSql = `select idDuelista from duelistas where fkUsuario='${idUsuario}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Checando quais decks o usuário possui */
router.get('/validar_decks/:idUsuario', function(req, res, next) {

    var idUsuario = req.params.idUsuario;
	
	let instrucaoSql = `select idDeck from decks where fkUsuario='${idUsuario}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;
