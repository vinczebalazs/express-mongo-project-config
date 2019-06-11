module.exports = [
  // Handle all errors.
  function(err, req, res, next) {
    console.error(err)
    res.status(err.statusCode).json({ error: err.message })
  }
]
