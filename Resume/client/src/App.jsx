import { useState, useEffect } from "react";
import { Container, Navbar, Nav, Card, Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [overview, setOverview] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState({ technical: [], general: [] });
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  useEffect(() => {
    axios.get("http://localhost:8000/getOverview").then(res => setOverview(res.data));
    axios.get("http://localhost:8000/getEdu").then(res => setEducation(res.data));
    axios.get("http://localhost:8000/getExp").then(res => setExperience(res.data));
    axios.get("http://localhost:8000/getSkills").then(res => setSkills(res.data));
    axios.get("http://localhost:8000/getCerts").then(res => setCertifications(res.data));
    axios.get("http://localhost:8000/getLanguages").then(res => setLanguages(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message was successfully sent, I will contact you later.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <Container fluid className="p-0 app-container">
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="#">Palmer Ngale</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#overview">Overview</Nav.Link>
            <Nav.Link href="#education">Education</Nav.Link>
            <Nav.Link href="#experience">Experience</Nav.Link>
            <Nav.Link href="#skills">Skills</Nav.Link>
            <Nav.Link href="#certifications">Certifications</Nav.Link>
            <Nav.Link href="#languages">Languages</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="p-4 main-content">
        <h1 className="text-center mb-4">Welcome to My Online Resume</h1>
        
        <h2 id="overview" className="mt-5">Overview</h2>
        <Card className="p-3 my-3 shadow-sm">
          <p>{overview.summary}</p>
        </Card>

        <h2 id="education" className="mt-5">Education</h2>
        {education.map((edu, index) => (
          <Card key={index} className="p-3 my-3 shadow-sm">
            <h5>{edu.degree}</h5>
            <p>{edu.institution} ({edu.year})</p>
          </Card>
        ))}

        <h2 id="experience" className="mt-5">Experience</h2>
        {experience.map((exp, index) => (
          <Card key={index} className="p-3 my-3 shadow-sm">
            <h5>{exp.title}</h5>
            <p>{exp.company} ({exp.period})</p>
            {exp.details.length > 0 && (
              <ListGroup variant="flush">
                {exp.details.map((detail, i) => (
                  <ListGroup.Item key={i}>{detail}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        ))}

        <h2 id="skills" className="mt-5">Skills</h2>
        <div className="d-flex justify-content-around flex-wrap mt-3">
          <Card className="p-3 text-center">
            <i className="fa-brands fa-react fa-3x text-primary"></i>
            <p>React</p>
          </Card>
          <Card className="p-3 text-center">
            <i className="fa-brands fa-python fa-3x text-warning"></i>
            <p>Python</p>
          </Card>
          <Card className="p-3 text-center">
            <i className="fa-brands fa-java fa-3x text-danger"></i>
            <p>Java</p>
          </Card>
          <Card className="p-3 text-center">
            <i className="fa-brands fa-js fa-3x text-secondary"></i>
            <p>JavaScript</p>
          </Card>
          <Card className="p-3 text-center">
            <i className="fa-solid fa-database fa-3x text-success"></i>
            <p>Database</p>
          </Card>
        </div>

        <h2 id="certifications" className="mt-5">Certifications</h2>
        <ListGroup className="my-3">
          {certifications.map((cert, index) => (
            <ListGroup.Item key={index}>{cert}</ListGroup.Item>
          ))}
        </ListGroup>

        <h2 id="languages" className="mt-5">Languages</h2>
        <ListGroup className="my-3">
          {languages.map((lang, index) => (
            <ListGroup.Item key={index}>{lang.language} - {lang.proficiency}</ListGroup.Item>
          ))}
        </ListGroup>

        <h2 id="contact" className="mt-5">Contact Me</h2>
        <Form onSubmit={handleSubmit} className="p-3 shadow-sm contact-section">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">Send</Button>
        </Form>
      </Container>

      <footer className="text-center mt-5"> 
        <div className="social-links mt-4 d-flex justify-content-center gap-4">
            <a href="mailto:palmer.pa123@gmail.com">
              <i className="fa-solid fa-envelope fa-2x"></i>
            </a>
            <a href="https://www.linkedin.com/in/palmer-ngale-45ab47306" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin-in fa-2x"></i>
            </a>
            <a href="https://github.com/Palmer0001" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github fa-2x"></i>
            </a>
            <a href="https://www.instagram.com/palmer_ngale/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram fa-2x"></i>
            </a>
        </div>
        <p className="mt-4">Palmer Ngale &copy; 2025</p>
      </footer>
    </Container>
  );
}

export default App;
