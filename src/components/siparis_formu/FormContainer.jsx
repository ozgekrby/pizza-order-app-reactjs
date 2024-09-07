import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, FormText } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from 'react-router-dom';

const extMal = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalapeno",
  "Sarımsak",
  "Biber",
  "Ananas",
  "Kabak",
];

const pizzaData = {
  name: "Position Absolute Acı Pizza",
  price: 85.5,
  size: 4.9,
  gram: "(200)",
  text:"Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.",
  kucuk:0.00,
  orta:40.00,
  buyuk:70.00,
};

export default function FormContainer() {
  const [count, setCount] = useState(1);
  const [selectedExtra, setSelectedExtra] = useState([]);
  const [sum, setSum] = useState(0);
  const [radioSelect,setRadioSelect]=useState(null);
  const [crustThickness, setCrustThickness] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    event.preventDefault(); 
  history.push('/Success');
  };
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  const handleSelectChange = (event) => {
    const selectedEx = event.target.value;
    setSelectedExtra((checked) => {
      if (checked.includes(selectedEx)) {
        return checked.filter((item) => item !== selectedEx);
      } else if (checked.length < 10) {
        return [...checked, selectedEx];
      }
      return checked;
    });
  };
  const handleRadioChange = (event) => {
    const selectedRadio = event.target;
  setRadioSelect(Number(selectedRadio.value));
  };
  const handleCrustChange = (event) => {
    setCrustThickness(event.target.value);
  };
  const totalSelectedEx = selectedExtra.length * 5;
  const resultSum = () => {
    let total = pizzaData.price + totalSelectedEx + (Number(radioSelect) || 0);
    if(count > 0){
      total *= count;
      setSum(total);
    }
  };
  useEffect(() => {
    resultSum();
  }, [count, selectedExtra,radioSelect]);

  const isFormValid = radioSelect !==null && crustThickness !== "" && crustThickness !== "Hamur Kalınlığı";

  return (
    <Form onSubmit={handleSubmit} className="form-container">
      <FormGroup className="pizza-container">
        <Label className="bold-text">{pizzaData.name}</Label>
        <div className="list-inline">
          <p className="list-inline-item-price">{pizzaData.price.toFixed(2)}₺</p>
          <div className="pizza-size-gram">
          <p className="list-inline-item">{pizzaData.size}</p>
          <p className="list-inline-item">{pizzaData.gram}</p>
          </div>
        </div>
        <FormText className="pizza-text">
          {pizzaData.text}
        </FormText>
      </FormGroup>
      <div className="prop-choose">
      <FormGroup className="d-flex justify-content-between">
        <div>
          <FormGroup>
            <Label for="boyut" className="bold-text">Boyut Seçimi</Label>
            <div className="form-check">
              <Input
                type="radio"
                name="boyut"
                id="kucuk"
                value={pizzaData.kucuk}
                className="form-check-input"
                onChange={handleRadioChange}
              />
              <Label for="kucuk" className="form-check-label">
                Küçük
              </Label>
            </div>
            <div className="form-check">
              <Input
                type="radio"
                name="boyut"
                id="orta"
                value={pizzaData.orta}
                className="form-check-input"
                onChange={handleRadioChange}
              />
              <Label for="orta" className="form-check-label">
                Orta
              </Label>
            </div>
            <div className="form-check">
              <Input
                type="radio"
                name="boyut"
                id="buyuk"
                value={pizzaData.buyuk}
                className="form-check-input"
                onChange={handleRadioChange}
              />
              <Label for="buyuk" className="form-check-label">
                Büyük
              </Label>
            </div>
          </FormGroup>
        </div>
        <div className="crust-thickness">
          <Label for="crust-thickness" className="bold-text">Hamur Seç</Label>
          <Input id="crust-thickness" name="select" type="select" onChange={handleCrustChange}>
          <option>Hamur Kalınlığı</option>
            <option>İnce</option>
            <option>Normal</option>
            <option>Kalın</option>
          </Input>
        </div>
      </FormGroup>
      </div>
      <FormGroup>
        <Label className="bold-text extMal">Ek Malzemeler </Label><p className="exMal">En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
        <div className="d-flex flex-wrap">
          {extMal.map((extCheck, index) => (
            <FormGroup check inline className="me-3" key={index}>
              <Input
                type="checkbox"
                id={`extCheck-${index}`}
                value={extCheck}
                checked={selectedExtra.includes(extCheck)}
                onChange={handleSelectChange}
                disabled={
                  selectedExtra.length >= 10 &&
                  !selectedExtra.includes(extCheck)
                }
              />
              <Label check for={`extCheck-${index}`}>
                {extCheck}
              </Label>
            </FormGroup>
          ))}
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="order-note" className="bold-text">Sipariş Notu</Label>
        <Input
          id="order-note"
          name="order-note"
          placeholder="Siparişine eklemek istediğin bir not var mı?"
          className="not-input" 
        />
      </FormGroup>
      <hr />
      <div className="form-result ">

        <div className="result-count d-flex align-items-center justify-content-start">
          <Button className="counting" color="warning" onClick={decrement}>
            -
          </Button>
          <div className="count">{count}</div>
          <Button className="counting" color="warning" onClick={increment}>
            +
          </Button>
        </div>
        <div className="result-price">
          <div className="result-price-content">
          <p className="bold-text">Sipariş Toplamı</p>
          <div className="result-price-item-1"><p>{`Seçimler: `}</p><span>{`${totalSelectedEx.toFixed(2)}₺`}</span></div>
          <div className="result-price-item-2"><p>{`Toplam: `}</p><span>{`${sum.toFixed(2)}₺`}</span></div>
          </div>
        </div>
      </div>
      <div className="form-button"><Button className="submit-button" color="warning" disabled={!isFormValid}>SİPARİŞ VER</Button></div>
    </Form>
  );
}
