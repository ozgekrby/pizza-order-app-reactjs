import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import OrderForm from './components/siparis_formu/OrderForm';
import Header from './components/Header';
import Home from './components/Home';
import Success from './components/Success';

function App() {

  return (
    <Router>
      <div className='app-container'>
        <Header />
        <Switch>
          <Route path="/" exact component={OrderForm} />
          <Route path="/siparis-olustur" component={OrderForm} />
          <Route path="/home" component={Home} />
          <Route path="/success" component={Success} />
        </Switch>
      </div>
    </Router>
  );
}

export default App
