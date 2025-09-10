const express = require("express");
const { PatientModel } = require("../models/Patient.model");
const { ReportModel } = require("../models/Report.model");

const router = express.Router();

// ✅ Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.status(200).send({ patients });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// ✅ Register new patient
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const patient = await PatientModel.findOne({ email });
    if (patient) {
      return res.send({
        message: "Patient already exists",
        id: patient.patientID,
      });
    }
    const newPatient = new PatientModel(req.body);
    await newPatient.save();
    res.send({ id: newPatient.patientID, message: "Registered" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error registering patient" });
  }
});

// ✅ Patient login
router.post("/login", async (req, res) => {
  const { patientID, password } = req.body;
  try {
    const patient = await PatientModel.findOne({ patientID, password });

    if (patient) {
      const report = await ReportModel.find({ email: patient.email });
      res.send({
        message: "Login Successful",
        user: patient,
        report,
      });
    } else {
      res.send({ message: "Wrong credentials, Please try again." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error occurred, unable to Login." });
  }
});

// ✅ Update patient (admin use)
router.patch("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  const payload = req.body;
  try {
    const patient = await PatientModel.findByIdAndUpdate(id, payload, { new: true });
    if (!patient) {
      return res.status(404).send({ message: `Patient with id ${id} not found` });
    }
    res.status(200).send({ message: "Patient updated", patient });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

// ✅ Delete patient (admin use)
router.delete("/:patientId", async (req, res) => {
  const id = req.params.patientId;
  try {
    const patient = await PatientModel.findByIdAndDelete(id);
    if (!patient) {
      return res.status(404).send({ message: `Patient with id ${id} not found` });
    }
    res.status(200).send({ message: `Patient with id ${id} deleted` });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
