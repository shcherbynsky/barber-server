const uuid = require("uuid");
const path = require("path");
const { Master } = require("../models/models");

class MasterController {
  async getAll(req, res) {
    const masters = await Master.findAll({ raw: true });
    return res.json(masters);
  }
  async getOne(req, res) {
    const {id} = req.params
    const master = await Master.findByPk(id);
    return res.json(master);
  }
  async add(req, res) {
    try {
      const { name } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const master = await Master.create({ name, imgUrl: fileName });
      return res.json(master);
    } 
    catch (error) {
        console.log('error = ', error.message); 
    }
  }
}

module.exports = new MasterController();
