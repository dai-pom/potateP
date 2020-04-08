import * as React from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import icon from "../../../image/logo192.png";
import st from "./navigationBar.module.css";
type MenuProps = {};

const NavigationBar: React.FC<MenuProps> = () => {
  return (
    <Navbar expand="sm" className={st.menu} fixed="top" color="white">
      <NavbarBrand tag={RRNavLink} to="/home">
        <img src={icon} width="30" height="30" />
        Potate
      </NavbarBrand>
      <Nav navbar className={"mr-auto"}>
        <NavItem>
          <NavLink tag={RRNavLink} to="/events">
            Event
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/login">
            Menu2
          </NavLink>
        </NavItem>
      </Nav>
      <Nav navbar>
        <NavItem>
          <NavLink tag={RRNavLink} to="/home">
            User
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
