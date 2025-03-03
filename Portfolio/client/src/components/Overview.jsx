import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export default function Overview() {
  const [overview, setOverview] = useState({
    // name: "Palmer Ngale",
    summary: "A passionate Full Stack Developer specializing in building exceptional and trending mobile apps and web applications. With a strong foundation in both front-end and back-end technologies, I bring ideas to life with clean, efficient, and scalable code."
  });

  return (
    <div className="container mt-4">
      <h2>Overview</h2>
      <Card className="p-3">
        <Card.Body>
          <Card.Title>{overview.name}</Card.Title>
          <Card.Text>{overview.summary}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}