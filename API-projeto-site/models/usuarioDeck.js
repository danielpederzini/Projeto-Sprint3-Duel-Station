'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let UsuarioDeck = sequelize.define('UsuarioDeck',{
		fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
        fkDeck: {
			field: 'fkDeck',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
		dataCompra: {
			field: 'dataCompra',
			type: DataTypes.DATE,
			allowNull: true
		}
	}, 
	{
		tableName: 'usuarioDeck', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return UsuarioDeck;
};


