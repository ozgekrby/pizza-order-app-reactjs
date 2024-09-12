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
        <p className="italic-text">fırsatı kaçırma</p>
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
          <button className="siparis-ver"onClick={handleOrderFormClick}>SİPARİŞ VER</button>
        </CardImgOverlay>
      </Card>
    );
  })}
</section>


      <div>
        <p className="italic-text" style={{ color: "#CE2829",marginTop:"2rem"
 }}>en çopk paketlenen menüler</p>
        <p className="bold-text" style={{ fontSize: "3rem",marginTop:"1rem"
 }}>Acıktıran Kodlara Doyuran Lezzetler</p>
      </div>
      <section className="menu-section">
        {menus2.map((item, i) => {
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
      <section className="container">
  <div className="row">
    {products.map((item, i) => {
      return (
        <div className="col-md-4" key={i}>
          <Card className="product-card" style={{ width: "100%" }}>
            <img
              alt="Card"
              src={`Assets/Iteration-2-aseets/pictures/food-${i + 1}.png`}
              className="card-img-top"
            />
            <CardBody>
              <CardTitle tag="h5">{item.name}</CardTitle>
            </CardBody>
            <CardBody>
              <CardText className="d-flex justify-content-between align-items-center light-text">
                <span>{item.size}</span>
                <div className="d-flex justify-content-between  align-items-center w-25 ">
                <span >{item.gram}</span> 
                <span className="bold-text">{item.price}</span>
                </div>
              </CardText>
            </CardBody>
          </Card>
        </div>
      );
    })}
  </div>
</section>

      <Footer />
    </>
  );
}
