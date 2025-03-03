import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export default function Education() {
  const [education, setEducation] = useState([
    { degree: "Bachelor of Science in Biomedical Sciences", institution: "University of Cameroon", year: "2018 - 2021" },
    { degree: "Diploma in Computer Programming", institution: "Humber College", year: "2024" }
  ]);

  return (
    <div className="container mt-4">
      <h2>Education</h2>
      {education.map((edu, index) => (
        <Card key={index} className="mb-3 p-3">
          <Card.Body>
            <Card.Title>{edu.degree}</Card.Title>
            <Card.Subtitle>{edu.institution}</Card.Subtitle>
            <Card.Text>{edu.year}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}