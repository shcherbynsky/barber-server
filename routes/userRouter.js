const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {login, registration, check, getOne} = require('../controllers/userController')
const authMiddleware = require('../middleWare/authMiddleware')

router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleware, check)
router.get('/', getOne)



module.exports = router