const errorHandler = (err, req, res, next) => {
    if(err) {
        let { name, message, stack } = err;
        stack = stack
                    .replace(name, '')
                    .replace(message, '')
                    .replaceAll(/\n/g, '');
        res.json({ type: name, message, stack });
    }
    next();
}

export default errorHandler;
