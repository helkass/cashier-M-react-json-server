import React from "react";

import { Nav } from "react-bootstrap";

const HeaderSection = ({ title, subtitleLink, subtitle, href }) => {
   return (
      <Nav className="d-flex justify-content-between align-self-middle">
         <Nav.Item>
            <h6 className="text-black font-weight-bold md">{title}</h6>
         </Nav.Item>
         <Nav.Item className="text-muted small p-0">
            {subtitleLink && (
               <Nav.Link href={href} className="text-muted small p-0">
                  {subtitleLink}
               </Nav.Link>
            )}
            {subtitle && <span>{subtitle}</span>}
         </Nav.Item>
      </Nav>
   );
};

export default HeaderSection;
