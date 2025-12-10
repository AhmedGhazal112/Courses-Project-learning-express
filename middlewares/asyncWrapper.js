module.exports = (asyncFn) => {
    if (typeof asyncFn !== 'function') {
        throw new TypeError('Expected a function to wrap in asyncWrapper');
    }

    return (req, res, next) => {
        try {
            const result = asyncFn(req, res, next);
            if (result && typeof result.catch === 'function') {
                result.catch((err) => next(err));
            }
        } catch (err) {
            next(err);
        }
    };
};