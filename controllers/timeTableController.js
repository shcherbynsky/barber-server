const uuid = require("uuid");
const path = require("path");
const { TimeTable } = require("../models/models");

class TimeTableController {
  async getAll(req, res) {
    let {date, masterId} = req.query
    masterId = parseInt(masterId)
    const day = await TimeTable.findAll({where: {date, masterId}});
    return res.json(day);
 
  }
  async getOneDay(req, res) {
    const {date, masterId} = req.params
    console.log(date, masterId);
    // const day = await TimeTable.findAll({where: {date : date, masterId : masterId}});
    // return res.json(day);
  }
  async add(req, res) {
    try {
      const { date, hours, minutes, serviceId, duration, masterId } = req.body;
      const dateItem = await TimeTable.create({ date, masterId, serviceId, duration, hours, minutes });
      return res.json(dateItem);
    } 
    catch (error) {
        console.log('error = ', error.message); 
    }
  }
}

module.exports = new TimeTableController();
