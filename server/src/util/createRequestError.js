const createRequestError = (message, statusCode) => {
  const requestError = new Error(message);
  requestError.status = statusCode;

  throw requestError;
};

export default createRequestError;
