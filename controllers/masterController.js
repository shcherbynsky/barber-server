const uuid = require("uuid");
const path = require("path");
const cloudinary = require("../services/cloudinary");

// const uploader = require("../services/multer");
const { Master } = require("../models/models");

class MasterController {
  async getAll(req, res) {
    const masters = await Master.findAll({ raw: true });
    return res.json(masters);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const master = await Master.findByPk(id);
    return res.json(master);
  }
  async add(req, res) {
    const { name, img } = req.body;
    try {
      if (img) {
        const uploadResponse = await cloudinary.uploader.upload(img, {
          upload_preset: "masterAvatar",
        });
        if (uploadResponse) {
          console.log("image upload successful");
          
          const master = await Master.create({ name, imgUrl: uploadResponse.url });
          return res.json(master);
        }
      }
    } catch (error) {
      console.log("error = ", error);
    }
  }
}

module.exports = new MasterController();
