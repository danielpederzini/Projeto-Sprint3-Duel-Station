'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Partida = sequelize.define('Partida',{
		idPartida: {
			field: 'idPartida',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			foreignKey: true,
			allowNull: false
		},
		fkDuelista: {
			field: 'fkDuelista',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		fkDeck: {
			field: 'fkDeck',
			type: DataTypes.INTEGER,
			allowNull: false
		},	
		rounds: {
			field: 'rounds',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		resultado: {
			field: 'resultado',
			type: DataTypes.STRING,
			allowNull: false
		},
		difPontosDeVida: {
			field: 'difPontosDeVida',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		mudancaSaldo: {
			field: 'mudancaSaldo',
			type: DataTypes.DECIMAL,
			allowNull: false
		}
	}, 
	{
		tableName: 'partida', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Partida;
};
