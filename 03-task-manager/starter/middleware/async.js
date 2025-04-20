const asyncWrapper = (callback) => {
    return async (req, res, next) => {
        try {
            return await callback(req, res, next)
        } catch (e) {
            next(e);
        }
    }
};

module.exports = asyncWrapper;
