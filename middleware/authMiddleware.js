module.exports = (req, res, next) => {
  // Skip token verification - allow all requests
  req.user = { id: "mockUserId123" }; // Simulated user ID for testing
  next();
};
