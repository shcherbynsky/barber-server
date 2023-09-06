const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    tel: {type: DataTypes.STRING, unique: true},
    telNew: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})
const Master = sequelize.define('master', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    imgUrl: {type: DataTypes.STRING},
    // password: {type: DataTypes.STRING},
    // role: {type: DataTypes.STRING, defaultValue: "MASTER"},
})
const Service = sequelize.define('service', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER}, 
    duration: {type: DataTypes.INTEGER}, 
})
const TimeTable = sequelize.define('timeTable', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date:{type: DataTypes.DATEONLY},
    hours:{type: DataTypes.SMALLINT},
    minutes:{type: DataTypes.SMALLINT},
    masterId: {type: DataTypes.SMALLINT},
    serviceId: {type: DataTypes.SMALLINT},
    duration: {type: DataTypes.SMALLINT},
})

module.exports = {
    User,
    Master,
    Service,
    TimeTable
}