class AuthError extends Error {
    constructor() {
        super("Not authorized");
    }
}

class PermissionError extends Error {
    constructor() {
        super("Not permission");
    }
}

module.exports = { AuthError, PermissionError };
