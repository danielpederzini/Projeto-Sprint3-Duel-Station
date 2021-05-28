'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let UsuarioDuelista = sequelize.define('UsuarioDuelista',{
		fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
        fkDuelista: {
			field: 'fkDuelista',
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
		tableName: 'usuarioDuelista', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return UsuarioDuelista;
};
