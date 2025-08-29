module.exports = (err, req, res, next) => {
  console.error(err); // log to console
  const status = err.status || 500;
  const response = {
    status: "error",
    message: err.message || "Internal Server Error"
  };
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }
  res.status(status).json(response);
};
