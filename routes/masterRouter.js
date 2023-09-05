const Router = require('express')
const router = new Router()
const masterController = require('../controllers/masterController')
// router.post('/addnewmaster', (req, res) => {
//     res.json({message: 'post master'})
// })
router.get('/', masterController.getAll)
router.get('/:id', masterController.getOne)
router.post('/', masterController.add)


module.exports = router