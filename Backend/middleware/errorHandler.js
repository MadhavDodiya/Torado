export const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err?.name === "ValidationError" || err?.name === "CastError") {
    statusCode = 400;
  } else if (err?.code === 11000) {
    statusCode = 409;
  } else if (
    err?.name === "JsonWebTokenError" ||
    err?.name === "TokenExpiredError"
  ) {
    statusCode = 401;
  }

  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
};
