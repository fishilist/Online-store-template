// Проверка данных при авторизации (декодируем пароли)
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const authorizationHeader = req.headers.authorization; // Достаем заголовки из запроса
        if (authorizationHeader == undefined) {
            return res.status(401).json({ message: "please provide authorization header" })
        }
        const token = authorizationHeader.split(' ')[1] // Bearer ...absfu_TOKEN_absfu...
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" })
    }
};
