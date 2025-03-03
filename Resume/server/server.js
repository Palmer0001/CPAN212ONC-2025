const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const resumeData = {
  overview: {
    name: "Palmer Ngale",
    summary: "A versatile and dedicated professional with over ten years of experience across healthcare, technology, hospitality, and customer service industries. Expertise in medical laboratory diagnostics, software development, and client engagement.",
    contact: "Toronto, ON, M3J 1V6 • 416-258-5616 • Palmer.pa123@gmail.com"
  },
  education: [
    { degree: "Diploma in Computer Programming", institution: "Humber College", year: "2025" },
    { degree: "BSc in Biomedical Science", institution: "University of Cameroon", year: "2021" }
  ],
  experience: [
    { 
      title: "Medical Laboratory Scientist Supervisor", 
      company: "Diligent Care Clinic", 
      period: "2021 to 2023",
      details: [
        "Conducted comprehensive diagnostic tests including blood work and biochemical assays",
        "Performed sample collection using diverse methods",
        "Oversaw laboratory maintenance and quality control"
      ]
    },
    { 
      title: "Web designer", 
      company: "Lush Fresh Handmade Cosmetics", 
      period: "2024 to 2025",
      details: [
        "Developed and maintained the company website",
        "Optimized website for mobile and desktop platforms",
        "Enhanced user experience through UI/UX design"
      ]
    }
  ],
  certifications: [
    "Ontario Security Licence | 2024",
    "Emergency First Aid and CPR/AED Level C | 2023"
  ],
  skills: {
    technical: ["Python", "Java", "SQL", "React", "JavaScript"],
    general: ["Effective Communication", "Strategic Problem-Solving", "Adaptability"]
  },
  languages: [
    { language: "English", proficiency: "Fluent" },
    { language: "French", proficiency: "Intermediate" }
  ]
};

app.get("/getEdu", (req, res) => res.json(resumeData.education));
app.get("/getExp", (req, res) => res.json(resumeData.experience));
app.get("/getOverview", (req, res) => res.json(resumeData.overview));
app.get("/getCerts", (req, res) => res.json(resumeData.certifications));
app.get("/getSkills", (req, res) => res.json(resumeData.skills));
app.get("/getLanguages", (req, res) => res.json(resumeData.languages));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));