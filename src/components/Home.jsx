import React from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Footer from "./Footer";
const menus = [
  "YENİ! Kore",
  "Pizza",
  "Burger",
  "Kızartmalar",
  "Fast Food",
  "Gazlı İçecek",
];
const promotional = [
  {
    name: "Özel Lezzetus",
    exp: "Position:Absolute Acı Burger",
    important: null,
  },
  {
    name: "Hackatlon Burger Menu",
    exp: null,
    important: null,
  },
  {
    name: "hızlı npm gibi kurye",
    exp: null,
    important: "Çooook",
  },
];
const menus2 = [
  "Ramen",
  "Pizza",
  "Burger",
  "French Fries",
  "Fast Food",
  "Soft Drinks",
];
const products = [
  {
    name: "Terminal Pizza",
    price: "60₺",
    size: "4.9",
    gram: "(200)",
  },
  {
    name: "Position Absolute Acı Pizza",
    price: "60₺",
    size: "4.9",
    gram: "(200)",
  },
  {
    name: "useEffect Tavuklu Burger",
    price: "60₺",
    size: "4.9",
    gram: "(200)",
  },
];
export default function Anasayfa() {
  const history = useHistory();

  const handleOrderFormClick = () => {
    history.push("/siparis-olustur");
  };

  return (
    <>
      <section className="home">
        
        <div className="firsat">
        <p>fırsatı kaçırma</p>
          <img src="Assets/Iteration-1-assets/kod-aciktirir.svg" alt="" /></div>
        <div className="btn1">
          <button onClick={handleOrderFormClick} className="main-button">
            ACIKTIM
          </button>
        </div>
      </section>
      <section className="menu-section">
        {menus.map((item, i) => {
          return (
            <Nav key={i} className="menu-items">
              <NavItem className="w-100 d-flex">
                <img src={`Assets/Iteration-2-aseets/icons/${i + 1}.svg`} />
                <NavLink disabled href="#">{item}</NavLink>
              </NavItem>
            </Nav>
          );
        })}
      </section>
      <section className="promotion-section">
  {promotional.map((item, index) => {
    return (
      <Card inverse key={index}>
        <CardImg
          src={`Assets/Iteration-2-aseets/cta/kart-${index + 1}.png`}
        />
        <CardImgOverlay className="card-overlay">
          {item.important && <span className="important">{item.important} </span>}
          <span className={`overlay-name-${index+1}`}>{item.name}</span>
          <br />
          {item.exp && <CardText className="overlay-exp">{item.exp}</CardText>}
          <Button onClick={handleOrderFormClick}>Sipariş Ver</Button>
        </CardImgOverlay>
      </Card>
    );
  })}
</section>


      <div>
        <p>en çopk paketlenen menüler</p>
        <p>Acıktıran Kodlara Doyuran Lezzetler</p>
      </div>
      <section className="menu-section">
        {menus2.map((item, i) => {
          return (
            <Nav key={i} className="menu-items">
              <NavItem className="w-100 d-flex">
                <img src={`Assets/Iteration-2-aseets/icons/${i + 1}.svg`} />
                <NavLink href="#">{item}</NavLink>
              </NavItem>
            </Nav>
          );
        })}
      </section>
      <section className="products-section">
        {products.map((item, i) => {
          return (
            <Card
              style={{
                width: "18rem",
              }}
            >
              <img
                alt="Card"
                src={`Assets/Iteration-2-aseets/pictures/food-${i + 1}.png`}
              />
              <CardBody>
                <CardTitle tag="h5">{item.name}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>
                  <span>{item.size}</span>
                  <span>{item.gram}</span>
                  <span>{item.price}</span>
                </CardText>
              </CardBody>
            </Card>
          );
        })}
      </section>
      <Footer />
    </>
  );
}
