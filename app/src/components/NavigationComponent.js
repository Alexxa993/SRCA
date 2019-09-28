import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";
import { connect } from "react-redux";

const BoldedNavbarBrand = styled(NavbarBrand)`
  font-weight: bold;
`;

const NavigationComponent = props => {
  const { loggedInUser } = props;
  return (
    <Navbar color="light" light expand="md">
      <BoldedNavbarBrand href="/">
        SRCA - Software Release Cycle Assistant
      </BoldedNavbarBrand>
      {loggedInUser != "user" && (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink
              href={
                window.location.href.includes("/new")
                  ? "/components"
                  : "/components/new"
              }
            >
              {window.location.href.includes("/new")
                ? "Show Components"
                : "Create component"}
            </NavLink>
          </NavItem>
        </Nav>
      )}
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    loggedInUser: state.BackendReducer.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  null
)(NavigationComponent);
