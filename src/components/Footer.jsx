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
      <Container>
        <Row>
          <Col sm={12}>
            <h4>Teknolojik Yemekler</h4>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {address.map((item, i) => {
              return (
                <div key={i}>
                  <img 
                    src={`Assets/Iteration-2-aseets/footer/icons/icon-${i + 1}.png`}
                  />
                  <p>{item}</p>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    
      <Nav vertical>
        <NavbarText>Hot Menu</NavbarText>
        {navFooter.map((item,i)=>{
            return <NavItem key={i}>
          <NavLink disabled href="#">
            {item}
          </NavLink>
        </NavItem>
        })}
      </Nav>
      <div>
        <p>Instagram</p>
        {instagram.map((item,i)=>{
            return <img key={i} src={`Assets/Iteration-2-aseets/footer/insta/li-${i}.png`} alt={item.alt}/>
        })}
      </div>
    </div>
  );
}
