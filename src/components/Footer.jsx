import React from "react";
import { Col, Container, Nav, NavbarText, NavItem, NavLink, Row } from "reactstrap";

const address = [
  "341 Londonderry Road,Istanbul Türkiye",
  "aciktim@teknolojikyemekler.com",
  "+90 216 123 45 67",
];

const navFooter=[
"Terminal Pizza",
"5 Kişilik Hackathlon Pizza",
"useEffect Tavuklu Pizza",
"Beyaz  Console Frosty",
"Testler Geçti Mutlu Burger",
"Position Absolute Acı Burger",
]

const instagram=[
    {
        alt:"img-1",
    },
    {
        alt:"img-2",
    },
    {
        alt:"img-3",
    },
    {
        alt:"img-4",
    },
    {
        alt:"img-5",
    },
    {
        alt:"img-6",
    }
]

export default function Footer() {

  return (
    <div className="footer">
      <Container className="address">
        <Row>
          <Col>
<img src="Assets/Iteration-1-assets/Teknolojik Yemekler.svg" alt="" className="svg-logo" />
          </Col>
        </Row>
        <Row>
          <Col>
            {address.map((item, i) => {
              return (
                <div key={i}>
                  <img 
                    src={`Assets/Iteration-2-aseets/footer/icons/icon-${i + 1}.png`}
                  />
                  <span> {item}</span>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    
      <Nav vertical className="footer-menu">
        <h4>Hot Menu</h4>
        {navFooter.map((item,i)=>{
            return <NavItem key={i}>
          <NavLink disabled href="#" style={{color: '#faf7f2' }}>
            {item}
          </NavLink>
        </NavItem>
        })}
      </Nav>
      <div className="footer-instagram">
        <p>Instagram</p>
        {instagram.map((item,i)=>{
            return <img key={i} src={`Assets/Iteration-2-aseets/footer/insta/li-${i}.png`} alt={item.alt}/>
        })}
      </div>
    </div>
  );
}
