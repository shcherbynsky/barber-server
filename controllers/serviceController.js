const { Service } = require("../models/models");

class ServiceController {
  async getAll(req, res) {
    const services = await Service.findAll({ raw: true });
    return res.json(services);
  }

  async getOne(req, res) {
    const {id} = req.params
    const service = await Service.findByPk(id);
    return res.json(service);
  }


  async add(req, res) {
 
    try {
      const { title, price, duration } = req.body;
      const service = await Service.create({ title, price, duration });
      return res.json(service);
    } catch (error) {
      res.status(503).send({
        status: "error",
        message: `service creation failed`,
      });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    const findItemById = await Service.findByPk(id);
    if (!findItemById)
      res.status(404).send({
        status: "error",
        message: `service witth id ${id} not fount`,
      });
    const deletedService = findItemById.destroy();
    if (!deletedService)
      res.status(503).send({
        status: "error",
        message: `service with id ${id} delete failed`,
      });
    res.status(200).send({
      status: "success",
      message: `service with id ${id} deleted`,
    });
  }
}

module.exports = new ServiceController();
