const { body, validationResult } = require('express-validator')

  const roleValidationRules = () => {
    return [
      // username must be an email
      //body('username').isEmail(),
      // password must be at least 5 chars long
      body('name','Min 2 Character').isLength({ min: 2 }),
    ]
  }
  
  const validateRole = (req, res, next) => {
    const errors = validationResult(req)
    //(errors)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }
  
  module.exports = {
    roleValidationRules,
    validateRole,
  }
  