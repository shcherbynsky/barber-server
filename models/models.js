const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    tel: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    // email: {type: DataTypes.STRING, unique: true},
    // role: {type: DataTypes.STRING, defaultValue: "USER"},
    // telNew: {type: DataTypes.STRING, unique: true},
  },
  {
    timestamps: false,
  }
);
const Master = sequelize.define(
  "master",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    imgUrl: {
      type: DataTypes.STRING,
    },
    // password: {type: DataTypes.STRING},
    // role: {type: DataTypes.STRING, defaultValue: "MASTER"},
  },
  {
    timestamps: false,
  }
);

const Service = sequelize.define(
  "service",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    duration: { type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  }
);
const Feedback = sequelize.define(
  "feedback",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // user_id: {type: DataTypes.STRING},
    rating: { type: DataTypes.SMALLINT, allowNull:false },
    text: { type: DataTypes.STRING, allowNull: false },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);
const TimeTable = sequelize.define(
  "timeTable",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY },
    time: { type: DataTypes.TIME },
    // hours:{type: DataTypes.SMALLINT},
    // minutes:{type: DataTypes.SMALLINT},
    // userId: {type: DataTypes.SMALLINT},
    // masterId: {type: DataTypes.SMALLINT},
    // serviceId: {type: DataTypes.SMALLINT},
    duration: { type: DataTypes.SMALLINT },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Feedback);
Feedback.belongsTo(User);

Master.hasMany(TimeTable);
TimeTable.belongsTo(Master);

Service.hasMany(TimeTable);
TimeTable.belongsTo(Service);

User.hasMany(TimeTable);
TimeTable.belongsTo(User);

module.exports = {
  User,
  Master,
  Service,
  Feedback,
  TimeTable,
};
