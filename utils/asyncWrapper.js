const asyncWrapper = (fn) => {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message || "Something went wrong, try again";
        const statusCode =
          res.statusCode && res.statusCode === 200
            ? 500
            : res.statusCode || 500;
        res.status(statusCode).json({
          message: errorMessage,
        });
      } else {
        // Handle non-Error objects if needed
        res.status(500).json({
          message: "An unknown error occurred",
        });
      }
    }
  };
};

export default asyncWrapper;
