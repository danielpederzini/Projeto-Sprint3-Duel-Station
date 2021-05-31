var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Partida = require('../models').Partida;

router.post('/registrar/:user_id/:duelist/:deck/:rounds/:result/:lifepointsDiff/:currencyChange/:currency', function(req, res, next) {
	console.log('Registering match...');
	let fkUsuario = req.params.user_id;
	let fkDuelista = req.params.duelist;
	let fkDeck = req.params.deck;
	let rounds =  req.params.rounds;
	let resultado = req.params.result;
	let difPontosDeVida =  req.params.lifepointsDiff;
	let mudancaSaldo = req.params.currencyChange;
	let saldo = req.params.currency;

	let instrucaoSql = `update usuario set saldo=${saldo} where idUsuario=${fkUsuario}`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.UPDATE });

	Partida.create({
		fkUsuario: fkUsuario,
		fkDuelista: fkDuelista,
        fkDeck: fkDeck,
        rounds: rounds,
        resultado: resultado,
        difPontosDeVida: difPontosDeVida,
        mudancaSaldo: mudancaSaldo
	}).then(resultado => {
		console.log(`Created: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

router.get('/buscar_partidas_geral/:user_id', function(req, res, next) {
	console.log('Getting match info...');
	let fkUsuario = req.params.user_id;

	let instrucaoSql = `select * from partida where fkUsuario = ${fkUsuario} order by idPartida desc`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then(resultado => {
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get('/buscar_vitorias/:user_id', function(req, res, next) {
	console.log('Getting match info...');
	let fkUsuario = req.params.user_id;

	let instrucaoSql = `select count(idPartida) as numVitorias from partida where fkUsuario = ${fkUsuario} and resultado = 'Vitoria'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then(resultado => {
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get('/buscar_derrotas/:user_id', function(req, res, next) {
	console.log('Getting match info...');
	let fkUsuario = req.params.user_id;

	let instrucaoSql = `select count(idPartida) as numDerrotas from partida where fkUsuario = ${fkUsuario} and resultado = 'Derrota'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then(resultado => {
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get('/buscar_top_duelistas/:user_id', function(req, res, next) {
	console.log('Getting match info...');
	let fkUsuario = req.params.user_id;

	let instrucaoSql = `select fkDuelista, count(idPartida) as numPartidas from partida where fkUsuario = ${fkUsuario} group by fkDuelista order by numPartidas desc`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then(resultado => {
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get('/buscar_top_decks/:user_id', function(req, res, next) {
	console.log('Getting match info...');
	let fkUsuario = req.params.user_id;

	let instrucaoSql = `select fkDeck, count(idPartida) as numPartidas from partida where fkUsuario = ${fkUsuario} group by fkDeck order by numPartidas desc`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then(resultado => {
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get('/buscar_media_mudanca_saldo/:user_id', function(req, res, next) {
	console.log('Getting match info...');
	let fkUsuario = req.params.user_id;

	let instrucaoSql = `select avg(mudancaSaldo) as mediaMudancaSaldo from partida where fkUsuario = ${fkUsuario}`;
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