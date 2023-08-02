// Класс обработки ошибок
class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) { // Неправильный запрос
        return new ApiError(404, message)
    }

    static internal(message) { // Внутренняя ошибка
        return new ApiError(500, message)
    }

    static forbidden(message) { // Ошибка доступа
        return new ApiError(403, message)
    }
}

module.exports = ApiError
