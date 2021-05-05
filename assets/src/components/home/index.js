import React from 'react';
import { Form, Button, Navbar, Nav,NavDropdown, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
    render() {
      return (

        <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Curriculo" id="basic-nav-dropdown">
              <NavDropdown.Item href="/curriculo">Meus Curriculos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Vagas</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Perfil</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Vagas" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Consultar</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Vagas Diponíveis</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Consultar Vaga Personalizada</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
         
            <Button variant="outline-success">Aqui carregar img</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      );
    }
}