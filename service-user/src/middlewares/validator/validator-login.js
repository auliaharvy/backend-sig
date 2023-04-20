const { body, validationResult } = require('express-validator')

  const loginValidationRules = () => {
    return [
      // username must be an email
      //body('username').isEmail(),
      // password must be at least 5 chars long
      body('username','Min 2 Character').isLength({ min: 2 }),
      body('password').isLength({ min: 5 }),
    ]
  }
  
  const validatelogin = (req, res, next) => {
    const errors = validationResult(req)
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
    loginValidationRules,
    validatelogin,
  }
  