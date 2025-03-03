import { useEffect, useState } from "react";
import axios from "axios";

export default function Skills() {
  const [skills, setSkills] = useState({ technical: [], general: [] });

  useEffect(() => {
    axios.get("http://localhost:8000/getSkills")
      .then(response => setSkills(response.data))
      .catch(error => console.error("Error fetching skills:", error));
  }, []);

  return (
    <section id="skills" className="my-5">
      <div className="skills-category">
        <h2 className="section-title mb-4">
          <i className="fas fa-code me-2"></i>Skills
        </h2>
        <div className="skills-grid">
          {skills.technical.map((skill, index) => (
            <div key={index} className="skill-card">
              {skill}
              <div className="skill-progress"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="skills-category mt-5">
        <h2 className="section-title mb-4">
          <i className="fas fa-users me-2"></i>General Skills
        </h2>
        <div className="skills-grid">
          {skills.general.map((skill, index) => (
            <div key={index} className="skill-card">
              {skill}
              <div className="skill-progress"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}