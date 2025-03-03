import { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

export default function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getEdu")
      .then(response => setEducation(response.data))
      .catch(error => console.error("Error fetching education:", error));
  }, []);

  return (
    <section id="education" className="my-4">
      <h2 className="section-title">Education</h2>
      {education.map((edu, index) => (
        <Card key={index} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title>{edu.degree}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{edu.institution}</Card.Subtitle>
            <Card.Text className="text-primary">{edu.year}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
}