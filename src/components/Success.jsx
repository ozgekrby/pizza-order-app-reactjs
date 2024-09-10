import React from "react";
import Footer from "./Footer";

export default function Success({ orderData }) {
  return (
    <div className="success">
      <div className="success-text">
        <p>TEBRİKLER! SİPARİŞİNİZ ALINDI!</p>
      </div>
      <p>Boyut: {orderData.size}</p>
      <p>Hamur: {orderData.crust}</p>
      <p>{orderData.count}</p>
      <p>
        Ek Malzemeler:
        {orderData.extras.map((item, i) => {
          return (
            <span key={i}>
              {item}
              {i < orderData.extras.length - 1 && ","}
            </span>
          );
        })}
      </p>
      <div>
        <p>Sipariş Toplamı</p>
        <p>Seçimler: {orderData.extPrice}</p>
        <p>Toplam:{orderData.total}</p>
      </div>
      <p>{orderData.name}</p>
      {orderData.note.length>1 && <p>Sipariş Notu: {orderData.note}</p>}
      <Footer />
    </div>
  );
}
