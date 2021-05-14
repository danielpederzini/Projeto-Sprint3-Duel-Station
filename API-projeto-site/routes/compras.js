var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Checando quais players o usuário possui */
router.post('/validar_players', function(req, res, next) {

    var user_id = sessionStorage.getItem('id_usuario_meuapp');
	
	let instrucaoSql = `select idDuelista from duelistas where fkUsuario = '${user_id}'`;
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

    var user_id = sessionStorage.getItem('id_usuario_meuapp');
	
	let instrucaoSql = `select idDeck from decks where fkUsuario = '${user_id}'`;
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
