module.exports = (error, request, response, next) => {
  console.error(`${error.name}\n  ${error.description}`);
  console.log('error ===========> ',error)
  next(error);
};
