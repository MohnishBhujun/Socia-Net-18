const handleError = (msg, status) => {
    const error = new Error(msg);
    error.status = status;
    throw error;
  };
  
  module.exports={
    handleError,
  };