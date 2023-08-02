// Указываем методы запроса и функцию его обработки
// Для конкретного запроса соответствующая обработка
const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check) // Добавили промежуточный Middleware

module.exports = router
