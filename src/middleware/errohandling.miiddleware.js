const errorHandler = (
    error,
    req,
    res,
    _
  ) => {
    const statusCode = error.status || 500;
    const errororMessage = error.message 
    || "Unknow Server Error";
    return res.status(statusCode).json({
      erroror: {
        message: errororMessage,
        success: false,
      },
    });
  };
  module.exports=errorHandler