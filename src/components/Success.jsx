import React from "react";
import Footer from "./Footer";
import { Card, CardBody } from "reactstrap";

export default function Success({ orderData }) {
  return (
    <div className="success">
      
      <div className="success-text">
      <span className="italic-text">fırsatı kaçırma</span>
        <p className="verify">SİPARİŞ ALINDI!</p>
      </div>
      <h3>{orderData.pizzaName}</h3>
        
      <ul>
      <li>Sipariş Sahibi: <span className="li-span">{orderData.name}</span></li>
      <li>Boyut: <span className="li-span">{orderData.size}</span></li>
      <li>Hamur: <span className="li-span">{orderData.crust}</span></li>
      <li>Adet: <span className="li-span">{orderData.adet}</span></li>
      <li>
        Ek Malzemeler:
        {orderData.extras.map((item, i) => {
          return (
            <span className="li-span" key={i}>
               {item}
              { i < orderData.extras.length - 1 && ", "} 
            </span>
          );
        })}
      </li>
      {orderData.note.length>1 && <li>Sipariş Notu: <span className="li-span">{orderData.note}</span></li>}
      <li>Hızlı Teslimat: <span className="li-span">{orderData.teslimat}</span></li>
      </ul>
      
      <Card className="result-sum result-sum-card footer-sum">
          <CardBody className="result-sum-card ">
            <p>
              Sipariş Toplamı
            </p>
            <div className="footer-card-body">
              <div >
                <span >{`Seçimler: `}</span>
                <span >{orderData.extPrice}₺</span>
              </div>
              <div>
                <span>{`Toplam: `}</span>
                <span >{orderData.total}₺</span>
              </div>
            </div>
          </CardBody>
        </Card>
      <Footer />
    </div>
  );
}
