export const SchemaValidation = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (e) {
    res.status(400).json(e);
  }
};
