import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import OrderForm from "./components/siparis_formu/OrderForm";
import Header from "./components/Header";
import Home from "./components/Home";
import Success from "./components/Success";

function App() {
  const [orderData, setOrderData] = useState({
    name: "",
    adet: "",
    size: "",
    crust: "",
    extras: [],
    extPrice: "",
    total: "",
    note: "",
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
      </div>
    </Router>
  );
}

export default App;
