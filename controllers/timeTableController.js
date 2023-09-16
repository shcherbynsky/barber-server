const uuid = require("uuid");
const path = require("path");
const { TimeTable, User, Master, Service } = require("../models/models");

class TimeTableController {
  async getAll(req, res) {
    let { date, masterId, userId } = req.query;
    if (date && masterId) {
      masterId = parseInt(masterId);
      const day = await TimeTable.findAll({ where: { date, masterId } });
      return res.json(day);
    }
    if (userId) {
      userId = parseInt(userId);
      const data = await TimeTable.findAll({
        include: [
          {
            model: Master,
            as: "master",
          },
          {
            model: Service,
            as: "service",
          },
        ],
        where: { userId },
      });
      return res.json(data);
    }
  }
  // class TimeTableController {
  //   async getAll(req, res) {
  //     let {userId} = req.query
  //     console.log('userId = ', userId);
  //     userId = parseInt(userId)
  //     const data = await TimeTable.findAll({
  //           include: [{
  //             model: Master,
  //             as: 'master'
  //           },
  //           {
  //             model: Service,
  //             as: 'service'
  //           }],
  //           where: {id: userId}
  //         })
  //     return res.json(data);

  //   }
  // async getAll(req, res) {
  //   let {date, masterId} = req.query
  //   masterId = parseInt(masterId)
  //   const day = await TimeTable.findAll({where: {date, masterId}});
  //   return res.json(day);

  // }
  async getOneDay(req, res) {
    const { date, masterId } = req.params;
    console.log(date, masterId);
    // const day = await TimeTable.findAll({where: {date : date, masterId : masterId}});
    // return res.json(day);
  }
  async add(req, res) {
    try {
      const { date, time, serviceId, userId, duration, masterId } = req.body;
      const dateItem = await TimeTable.create({
        date,
        time,
        serviceId,
        userId,
        duration,
        masterId,
      });
      return res.json(dateItem);
    } catch (error) {
      console.log("error = ", error.message);
    }
  }

  //  async getAllBooking (req, res) {
  //   const data = await TimeTable.findAll({
  //     include: [{
  //       model: User,
  //       as: 'user'
  //     }],
  //     where: {id: userId}
  //   })
  // }
}

module.exports = new TimeTableController();
