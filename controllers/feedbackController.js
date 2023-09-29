const { Feedback, User } = require("../models/models");

class FeedbackController {
  async getAll(req, res) {

      const data = await Feedback.findAll({
        raw: true,
        include: [
          {
            model: User,
            as: "user",
          },
         
        ],
      });
      return res.json(data);
    }
 

  


  async add(req, res) {
    try {
      const { rating, text, userId } = req.body;
      // res.status(200).send({
      //   status: "success",
      //   message: 'All is OK',
      // });
      const feedback = await Feedback.create({ rating, text, userId });
      return res.json(feedback);
    } catch (error) {
      res.status(503).send({
        status: "error",
        message: 'Не вдалось залишити видгук! Будь ласка, спробуйте пізніше((',
      });
    }
  }
}

module.exports = new FeedbackController();
