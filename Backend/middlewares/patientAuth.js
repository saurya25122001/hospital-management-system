const authenticate = (req, res, next) => {
  // Always allow requests as Patient
  req.body.patientID = "dummyPatient123";
  next();
};

module.exports = { authenticate };
