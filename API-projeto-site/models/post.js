'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define('Post',{
		idPost: {
			field: 'idPost',
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
		texto: {
			field: 'texto',
			type: DataTypes.STRING,
			allowNull: false
		},
		likes: {
			field: 'likes',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		dislikes: {
			field: 'dislikes',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'post', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Post;
};
