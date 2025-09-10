const authenticate = (req, res, next) => {
  // Always allow requests as Doctor
  req.body.doctorID = "dummyDoctor123";
  next();
};

module.exports = { authenticate };
