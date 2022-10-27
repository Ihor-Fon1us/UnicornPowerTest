class ValidationError extends Error{
    constructor(fails) {
        super();
        this.message = "Validation error"
        this.statusCode = 422;
        this.fails = fails;
    }
}

class UserNotFoundError extends Error{
    constructor() {
        super();
        this.message = "The user with the requested identifier does not exist";
        this.statusCode = 404;
    }
}

class TokenError extends Error{
    constructor(message) {
        super();
        this.statusCode = 401;
        this.message = message;
    }
}

class PageNotFoundError extends Error{
    constructor() {
        super();
        this.statusCode = 404;
        this.message = "Page not found.";
    }
}

module.exports = {
    ValidationError,
    UserNotFoundError,
    TokenError,
    PageNotFoundError,
}