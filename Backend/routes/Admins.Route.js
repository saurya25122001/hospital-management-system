const express = require("express");
const { AdminModel } = require("../models/Admin.model");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { NurseModel } = require("../models/Nurse.model");
const { DoctorModel } = require("../models/Doctor.model");
const { PatientModel } = require("../models/Patient.model");

const router = express.Router();

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// Register admin
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      return res.send({ message: "Admin already exists" });
    }
    let value = new AdminModel(req.body);
    await value.save();
    const data = await AdminModel.findOne({ email });
    return res.send({ data, message: "Registered" });
  } catch (error) {
    res.send({ message: "Error" });
  }
});

// Login admin (NO JWT anymore)
router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ adminID, password });
    if (admin) {
      res.send({ message: "Successful", user: admin });
    } else {
      res.send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Error while login" });
  }
});

// Update admin
router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

// Delete admin
router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

// Send password directly by email
router.post("/password", (req, res) => {
  const { email, userId, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrawaljoy1@gmail.com",
      pass: "zxkyjqfuhiizmxrg", // ⚠️ use env var for safety
    },
  });

  const mailOptions = {
    from: "agrawaljoy1@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and Password : ${password}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.send(error);
    return res.send("Password reset email sent");
  });
});

// Forgot password (check user type)
router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  let user;
  let userId;
  let password;

  if (type == "nurse") {
    user = await NurseModel.findOne({ email });
    userId = user?.nurseID;
    password = user?.password;
  }
  if (type == "patient") {
    user = await PatientModel.findOne({ email });
    userId = user?.patientID; // fixed from nurseID
    password = user?.password;
  }
  if (type == "admin") {
    user = await AdminModel.findOne({ email });
    userId = user?.adminID;
    password = user?.password;
  }
  if (type == "doctor") {
    user = await DoctorModel.findOne({ email });
    userId = user?.docID;
    password = user?.password;
  }

  if (!user) {
    return res.send({ message: "User not found" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrawaljoy1@gmail.com",
      pass: "zxkyjqfuhiizmxrg", // ⚠️ use env var
    },
  });

  const mailOptions = {
    from: "agrawaljoy1@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and Password : ${password}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.send(error);
    return res.send("Password reset email sent");
  });
});

module.exports = router;
