const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')
// router.post('/addnewmaster', (req, res) => {
//     res.json({message: 'post master'})
// })
router.get('/', serviceController.getAll)
router.get('/:id', serviceController.getOne)
router.post('/', serviceController.add)
router.delete('/:id', serviceController.delete)


module.exports = router