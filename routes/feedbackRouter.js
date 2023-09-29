const Router = require('express')
const { getAll, add } = require('../controllers/feedbackController')
const router = new Router()
const feedbackController = require('../controllers/feedbackController')
const authMiddleware = require('../middleWare/authMiddleware')

router.post('/', add)
router.get('/', getAll)


module.exports = router