import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import OrderForm from "./components/siparis_formu/OrderForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Success from "./components/Success";
import Footer from "./components/Footer";

function App() {
  const [orderData, setOrderData] = useState({
    pizzaName: "",
    name: "",
    adet: "",
    size: "",
    crust: "",
    extras: [],
    extPrice: "",
    total: "",
    note: "",
    teslimat: "",
  });

  return (
    <Router>
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/siparis-olustur"
            render={() => <OrderForm setOrderData={setOrderData} />}
          />
          <Route path="/home" component={Home} />
          <Route
            path="/success"
            render={() => <Success orderData={orderData} />}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
