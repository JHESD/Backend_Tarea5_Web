const { DataTypes } = require('sequelize');
const sequelize = require('../db/db_confing');

const User = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        field: 'id_usuario'
    },
    user: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        field: 'name_user'
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        field: 'person_name'
    },
    lastname: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        field: 'person_lastname'
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        field: 'person_email'
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        field: 'person_password'
    },
    nit: { 
        type: DataTypes.STRING, 
        unique: true, 
        field: 'person_nit'
    },
    isAdmin: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
        field: 'person_usr_adm'
    }
}, {
    tableName: 'usuario', 
    timestamps: false,
});

module.exports = User;
