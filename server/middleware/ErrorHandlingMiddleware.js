// Обрабатывает запрос до его обработки (проверяет данные)
// Принимает ошибку, запрос, ответ и функцию next, которая передает управление следующему Middleware
const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}
