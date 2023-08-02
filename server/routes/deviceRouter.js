// Указываем методы запроса и функцию его обработки
// Для конкретного предмета соответствующий запрос
const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router
