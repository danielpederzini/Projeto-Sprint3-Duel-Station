var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Partida = require('../models').Partida;

var match_info = require('../public/script/game');

router.post('/registrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	Partida.create({
		fkUsuario: match_info.user_id,
		duelista: match_info.duelist_name,
        deck: match_info.deck_name,
        rounds: match_info.rounds,
        resultado: match_info.result,
        difPontosDeVida: match_info.lifepoints_diff,
        mudancaSaldo: match_info.currency_change
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});
module.exports = router;