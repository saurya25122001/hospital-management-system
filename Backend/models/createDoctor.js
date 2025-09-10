const mongoose = require("mongoose");
const { DoctorModel } = require("./Doctor.model"); // adjust path

// Replace with your Atlas connection string
const MONGO_URL = "mongodb+srv://Shaurya:2512@cluster0.sfn3g5q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Atlas connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Example doctor creation
async function createDoctor() {
  try {
    const doctor = new DoctorModel({
      docID: 100,
      docName: "Dr. Shaurya",
      password: "Masai",
      email: "shaurya@example.com",
      department: "Cardiology",
    });
    const result = await doctor.save();
    console.log("Doctor created:", result);
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
}

createDoctor();
