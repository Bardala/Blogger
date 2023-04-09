const requestLogger = (req, res, next) => {
  console.log(req.method, req.path, "- body:", req.body);
  next();
};

module.exports = { requestLogger };
