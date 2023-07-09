const errorHandler = (err, req, res, next) => {
  console.error("Error Handler Function", err);
  console.log(typeof err);

  // if (err instanceof MyCustomError) {
  //   return res.status(400).send("Bad Request");
  //   // return res.status(400).json({ error: err.message });
  // }
  // if (err instanceof NotFoundError) {
  //   return res.status(404).send("Not Found");
  //   // return res.status(404).json({ error: err.message });
  // }

  // return res.status(500).send("Internal Server Error");
  return res.status(500).json({ error: err.message });
};

module.exports = {
  errorHandler,
};
