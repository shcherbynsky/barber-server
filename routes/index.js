const Router = require('express')
const router = new Router()
const masterRouter = require('./masterRouter')
const serviceRouter = require('./serviceRouter')
const timeTableRouter = require('./timeTableRouter')
const userRouter = require('./userRouter')


router.use('/master', masterRouter)
router.use('/user', userRouter)
router.use('/service', serviceRouter)
router.use('/time', timeTableRouter)


module.exports = router 