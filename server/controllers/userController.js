const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt') // Шифрует данные
const jwt = require('jsonwebtoken')
const {User, Basket, Brand} = require('../models/models') // Импортируем нужный тип из БД

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'} // Сколько живет токен
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5) // Шифруем пароль 5 раз и сохраняем его
        const user = await User.create({email, role, password: hashPassword}) // Создаем объект пользователя
        const basket = await Basket.create({userId: user.id}) // Создаем под пользователя корзину с товарами
        const token = generateJwt(user.id, user.email, user.role) // Генерируем токен для пользователя
        return res.json({token}) // Отправляем токен пользователю
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async delete(req, res, next) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        const dest = await User.destroy({
            where: {
                id: id
            }
        })
        const bask = await Basket.destroy({
            where: {
                id: id
            }
        })
        return res.json(`Пользователь успешно удален`)
    }

    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }
    async getUser(req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        return res.json(user)
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
