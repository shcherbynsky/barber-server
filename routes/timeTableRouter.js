const Router = require('express')
const router = new Router()
const timeTableController = require('../controllers/timeTableController')
// router.post('/addnewmaster', (req, res) => {
//     res.json({message: 'post master'})
// })
router.get('/', timeTableController.getAll)
router.post('/', timeTableController.add)


module.exports = router