var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var UsuarioDuelista = require('../models').UsuarioDuelista;
var UsuarioDeck = require('../models').UsuarioDeck;

/* Comprando um duelista */
router.post('/comprar_duelista/:item_selecionado/:valor/:idUsuario/:saldo', function(req, res, next) {

	var fkDuelista = req.params.item_selecionado;
	var valor = Number(req.params.valor);
	var fkUsuario = req.params.idUsuario;
	var saldo = Number(req.params.saldo);

	saldo -= valor;

	UsuarioDuelista.create({
		fkDuelista: fkDuelista,
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
	
	var fkDeck = req.params.item_selecionado;
	var valor = Number(req.params.valor);
	var fkUsuario = req.params.idUsuario;
	var saldo = Number(req.params.saldo);

	saldo -= valor;
	
	UsuarioDeck.create({
		fkDeck: fkDeck,
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
	
	let instrucaoSql = `select fkDuelista from usuarioDuelista where fkUsuario='${idUsuario}'`;
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
	
	let instrucaoSql = `select fkDeck from usuarioDeck where fkUsuario='${idUsuario}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/buscar_compras_duelistas/:idUsuario', function(req, res, next) {

    var idUsuario = req.params.idUsuario;
	
	let instrucaoSql = `select fkDuelista, valorDuelista, dataCompra from usuario 
	join usuarioDuelista on fkUsuario = idUsuario 
	join duelista on fkDuelista = idDuelista where idUsuario='${idUsuario}' order by dataCompra desc`;
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
