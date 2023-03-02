import React, { memo } from "react";
import { useLocation } from "react-router-dom";
// bootstrap comps
import { Container, Image, Nav, Navbar } from "react-bootstrap";

// assets
import profile from "../assets/images/profile.png";

// links navbar items
let links = [
   {
      link: "/",
      label: "Dashboard",
   },
   {
      link: "/allProducts",
      label: "My Products",
   },
   {
      link: "/order",
      label: "Order List",
   },
   {
      link: "/history",
      label: "History",
   },
];

const NavbarComponent = () => {
   const location = useLocation();
   return (
      <Navbar expand="md" className="text-info shadow-sm">
         <Container>
            <Navbar.Brand className="font-weight-bold">Cashier</Navbar.Brand>
            <Nav
               activeKey={location.pathname}
               className="d-flex justify-content-between">
               {links.map((link, idx) => (
                  <Nav.Item key={idx}>
                     <Nav.Link
                        href={link.link}
                        className={`
                           ${
                              location.pathname === link.link &&
                              "text-primary border-primary border-bottom border-2"
                           }
                        `}>
                        {link.label}
                     </Nav.Link>
                  </Nav.Item>
               ))}
            </Nav>
            <Nav className="d-flex gap-col-2">
               <Navbar.Text>Admin</Navbar.Text>
               <Image
                  fluid
                  src={profile}
                  roundedCircle
                  height="40px"
                  width="40px"
                  className="d-block"
               />
            </Nav>
         </Container>
      </Navbar>
   );
};

export default memo(NavbarComponent);
