import { useState } from "react";
import { Container, Navbar, Nav, Card, Form, Button } from "react-bootstrap";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Overview from "./components/Overview";
import ContactMe from "./components/ContactMe";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

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
    <Container fluid className="p-0">
      <header className="header">
        <div className="header-overlay">
          <div className="header-content">Palmer Ngale</div>
          <Navbar variant="dark" expand="lg" className="p-3">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link href="#overview">
                    <i className="fa-solid fa-house"></i> Overview
                  </Nav.Link>
                  <Nav.Link href="#education">
                    <i className="fa-solid fa-graduation-cap"></i> Education
                  </Nav.Link>
                  <Nav.Link href="#experience">
                    <i className="fa-solid fa-briefcase"></i> Experience
                  </Nav.Link>
                  <Nav.Link href="#contact">
                    <i className="fa-solid fa-envelope"></i> Contact Me
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </header>

      <Container className="p-4">
        <h1>Welcome to My Portfolio</h1>
        <Overview />
        <Education />
        <Experience />

        <h2 className="mt-4">Skills & Technologies</h2>
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
      </Container>

      <footer className="footer bg-dark text-light py-4 mt-4">
        <Container>
          <h2>Say Hello</h2>
          <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>

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
        </Container>
      </footer>
    </Container>
  );
}

export default App;
