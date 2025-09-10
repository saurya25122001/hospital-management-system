const authenticate = (req, res, next) => {
  // Always allow requests as Admin
  req.body.adminID = "dummyAdmin123"; 
  next();
};

module.exports = { authenticate };
