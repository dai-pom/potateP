import * as React from "react";
// import { NavLink as RRNavLink, RouteComponentProps } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import icon from "../../../image/logo192.png";
import st from "./navigationBar.module.css";
import { AppState } from "../../../store";
import LogoutModal from "./logoutModal";
type MenuProps = Pick<AppState, "user">;

export const NavigationBar: React.FC<MenuProps> = (props) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);
  const logoutModalToggle = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };
  return (
    <>
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
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {props.user.name}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink tag={RRNavLink} to="/user">
                  Detail
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink onClick={logoutModalToggle}>Logout</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
      <LogoutModal isOpen={isLogoutModalOpen} toggle={logoutModalToggle} />
    </>
  );
};
