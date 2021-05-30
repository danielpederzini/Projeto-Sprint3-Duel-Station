var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function (req, res, next) {
	console.log('Recovering user by login/email and password');

	var login = req.body.login;
	var senha = req.body.password;

	let instrucaoSql = `select * from usuario where (login='${login}' or email='${login}') and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Found: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessions: ', sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Invalid login or password!');
		} else {
			res.status(403).send('More than one user with the same login and password');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function (req, res, next) {
	console.log('Creating an user');

	if (req.body.login == '' || req.body.email == '' || req.body.password == '' || req.body.password_confirm != req.body.password ||
		req.body.email.includes('@') == false || req.body.email.includes('.com') == false) {

		Usuario.create({
		}).then(resultado => {
			console.log(`Created register: ${resultado}`)
			res.send(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

	}

	else {

		Usuario.create({
			nomeUsuario: req.body.login,
			login: req.body.login,
			email: req.body.email,
			senha: req.body.password,
			saldo: 150,
			statusTutorial: 'on',
			urlFundoPerfil: 'img/profile_banner.png'
		}).then(resultado => {
			console.log(`Created register: ${resultado}`)
			res.send(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

	}

});


/* Verificação de usuário */
router.get('/sessao/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Checking if user ${login} has a session`);

	let has_session = false;
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] == login) {
			has_session = true;
			break;
		}
	}

	if (has_session) {
		let mensagem = `User ${login} has a session!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}

});


/* Logoff de usuário */
router.get('/sair/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Ending user ${login} session`);
	let nova_sessoes = []
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`User ${login} session finished succesfuly!`);
});


/* Recuperar todos os usuários */
router.get('/', function (req, res, next) {
	console.log('Recovering all users');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registers`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/rankear', function (req, res, next) {
	console.log('Getting top 10 players');

	let instrucaoSql = `select nomeUsuario, saldo from usuario order by saldo desc`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});

router.get('/buscar_saldo/:idUsuario', function (req, res, next) {
	console.log("Getting user's currency");

	var idUsuario = req.params.idUsuario;

	let instrucaoSql = `select saldo from usuario where idUsuario="${idUsuario}"`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			console.log(resultado);
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});

router.post('/salvar_configuracoes/:idUsuario', function (req, res, next) {
	console.log('Saving settings');

	var idUsuario = req.params.idUsuario;
	var novoNome = req.body.new_name.trim();
	var statusTutorial = req.body.tutorial_status;
	var urlFundoPerfil = req.body.background_url;

	var selectedInstructions = [];

	if (novoNome != '') {
		selectedInstructions.push(`update usuario set nomeUsuario = "${novoNome}" where idUsuario = ${idUsuario}`)
	}

	selectedInstructions.push(`update usuario set statusTutorial = "${statusTutorial ? 'on' : 'off'}" where idUsuario = ${idUsuario}`)

	if (urlFundoPerfil != '') {
		selectedInstructions.push(`update usuario set urlFundoPerfil = "${urlFundoPerfil}" where idUsuario = ${idUsuario}`)
	}

	for (var i = 0; i < selectedInstructions.length; i ++) {
		sequelize.query(selectedInstructions[i], {type: sequelize.QueryTypes.UPDATE })
		.then(resultado => {
			console.log(resultado);
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
	}
	
});

module.exports = router;
