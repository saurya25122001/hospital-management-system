const express = require("express");
const { DoctorModel } = require("../models/Doctor.model");
require("dotenv").config();
// const jwt = require("jsonwebtoken"); // removed if you don't want JWT

const router = express.Router(); // <-- must define router

// ✅ Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    res.status(200).send(doctors);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// ✅ Register doctor
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ email });
    if (doctor) {
      return res.send({
        message: "Doctor already exists",
      });
    }
    const value = new DoctorModel(req.body);
    await value.save();
    const data = await DoctorModel.findOne({ email });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error registering doctor" });
  }
});

// ✅ Login doctor
router.post("/login", async (req, res) => {
  const { docID, password } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ docID, password });

    if (doctor) {
      // If you want JWT, uncomment below:
      // const token = jwt.sign({ doctorID: doctor._id }, process.env.key, { expiresIn: "24h" });
      res.send({ message: "Successful", user: doctor /*, token */ });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Error logging in" });
  }
});

// ✅ Update doctor
router.patch("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  const payload = req.body;
  try {
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedDoctor) {
      return res.status(404).send({ message: `Doctor with id ${id} not found` });
    }
    res.status(200).send({ message: "Doctor Updated", user: updatedDoctor });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to update." });
  }
});

// ✅ Delete doctor
router.delete("/:doctorId", async (req, res) => {
  const id = req.params.doctorId;
  try {
    const doctor = await DoctorModel.findByIdAndDelete(id);
    if (!doctor) {
      return res.status(404).send({ msg: `Doctor with id ${id} not found` });
    }
    res.status(200).send({ message: `Doctor with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to delete." });
  }
});

module.exports = router;
