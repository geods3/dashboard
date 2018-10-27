import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";

const Navigation = () => {

  return (
    <Navbar fluid collapseOnSelect className="navBar" staticTop>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/">Code.Hub Dashboard</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem componentClass={NavLink} href="/" to="/Courses">Courses</NavItem>  
        </Nav>
        <Nav pullRight>
          <NavItem componentClass={NavLink} href="/" to="/AddNewCourse">Add new course</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>    
  );

};

export default Navigation;