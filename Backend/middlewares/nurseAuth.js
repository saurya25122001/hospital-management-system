const authenticate = (req, res, next) => {
  // Always allow requests as Nurse
  req.body.nurseID = "dummyNurse123";
  next();
};

module.exports = { authenticate };
