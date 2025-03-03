const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const education = [
  { degree: "Diploma in Computer Programming", institution: "Humber College", year: "Expected 2025" },
  { degree: "BSc in Biomedical Science", institution: "University of Buea", year: "2021" },
];

const experience = [
  { title: "Medical Laboratory Scientist Supervisor", company: "Diligent Care Clinic", year: "2021 - 2023" },
  { title: "Receptionist & Maintenance Staff", company: "Fred Victor", year: "2023 - 2024" },
];

const overview = {
  name: "Palmer Ngale",
  summary: "A versatile professional with expertise in healthcare, technology, and customer service.",
};

app.get("/getEdu", (req, res) => res.json(education));
app.get("/getExp", (req, res) => res.json(experience));
app.get("/getOverview", (req, res) => res.json(overview));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
