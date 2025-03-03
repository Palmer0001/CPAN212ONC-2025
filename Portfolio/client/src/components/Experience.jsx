import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export default function Experience() {
  const [experience, setExperience] = useState([
    { title: "Full Stack Developer", company: "Tech Corp", year: "2022 - Present" },
    { title: "Frontend Developer Intern", company: "Web Solutions", year: "2021" }
  ]);

  return (
    <div className="container mt-4">
      <h2>Experience</h2>
      {experience.map((exp, index) => (
        <Card key={index} className="mb-3 p-3">
          <Card.Body>
            <Card.Title>{exp.title}</Card.Title>
            <Card.Subtitle>{exp.company}</Card.Subtitle>
            <Card.Text>{exp.year}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}