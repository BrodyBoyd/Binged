const validate = (schema) => (req,res,next) => {
  const options = {
    aportEarly: false,
    allowUnknown: false,
    stripUnknown: true
  }

  const {error, value} = schema.validate(req.body, options);

  if (error) {
    const errorMessage = error.details.map(detail => detail.message);

    return res.status(400).json({
      status: 'error',
      type: 'ValidationFailed',
      message: "Invalid data submitted, view details",
      details: errorMessage
    })
  }
  req.body = value;
  next();

}

export { validate }