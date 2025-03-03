import { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";

export default function Experience() {
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getExp")
      .then(response => setExperience(response.data))
      .catch(error => console.error("Error fetching experience:", error));
  }, []);

  return (
    <section id="experience" className="my-4">
      <h2 className="section-title">Professional Experience</h2>
      {experience.map((exp, index) => (
        <Card key={index} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title>{exp.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{exp.company}</Card.Subtitle>
            <Card.Text className="text-primary">{exp.period}</Card.Text>
            {exp.details?.length > 0 && (
              <ListGroup variant="flush">
                {exp.details.map((detail, i) => (
                  <ListGroup.Item key={i}>{detail}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      ))}
    </section>
  );
}