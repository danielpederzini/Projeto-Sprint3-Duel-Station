'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Deck = sequelize.define('Deck',{
		idDeck: {
			field: 'idDeck',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
		nomeDeck: {
			field: 'nomeDeck',
			type: DataTypes.STRING,
			allowNull: false
		},
		valorDeck: {
			field: 'valorDeck',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'deck', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Deck;
};
