class CustomerAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomerAPIError(message, statusCode);
}

module.exports = {createCustomError, CustomerAPIError};