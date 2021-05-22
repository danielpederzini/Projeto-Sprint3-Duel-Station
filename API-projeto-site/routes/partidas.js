var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Partida = require('../models').Partida;

router.post('/registrar/:user_id/:duelist/:deck/:rounds/:result/:lifepointsDiff/:currencyChange/:currency', function(req, res, next) {
	console.log('Registering match...');
	let fkUsuario = req.params.user_id;
	let duelista = req.params.duelist;
	let deck = req.params.deck;
	let rounds =  req.params.rounds;
	let resultado = req.params.result;
	let difPontosDeVida =  req.params.lifepointsDiff;
	let mudancaSaldo = req.params.currencyChange;
	let saldo = req.params.currency;

	let instrucaoSql = `update usuario set saldo="${saldo}" where idUsuario="${fkUsuario}"`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.UPDATE });

	Partida.create({
		fkUsuario: fkUsuario,
		duelista: duelista,
        deck: deck,
        rounds: rounds,
        resultado: resultado,
        difPontosDeVida: difPontosDeVida,
        mudancaSaldo: mudancaSaldo
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;