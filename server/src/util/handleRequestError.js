const handleRequestError = (error, res) => {
  const errors = [];
  if (error.errors) {
    Object.keys(error.errors).forEach((key) => {
      errors.push(`${key} : ${error.errors[key].message}`);
    });

    return res
      .status(400)
      .json({ success: false, msg: `BAD REQUEST: ${errors}` });
  } else {
    return res.status(500).json({
      success: false,
      msg: `SERVER ERROR: ${error.message}`,
    });
  }
};

export default handleRequestError;
