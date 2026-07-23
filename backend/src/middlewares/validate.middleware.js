export const validate = (schema) => {
  return (req, res, next) => {
    console.log(req.originalUrl);
    console.log(req.body);
    console.dir(schema.shape, { depth: null });
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log(result.error.issues);

      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: result.error.issues,
      });
    }

    req.body = result.data;
    next();
  };
};

export const validateQuery = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: result.error.issues,
      });
    }
    Object.assign(req.query, result.data);
    next();
  };
};

