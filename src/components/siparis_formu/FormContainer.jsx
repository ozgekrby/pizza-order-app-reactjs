import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const pizzaData = {
  name: "Position Absolute Acı Pizza",
  price: 85.5,
  size: 4.9,
  gram: "(200)",
  text: "Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.Küçük bir pizzaya bazen pizzetta denir.",
  extMal: [
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
  ],
  sizeChoose: ["küçük", "orta", "büyük"],
  crustThickness: ["ince", "normal", "kalın"],
};

export default function FormContainer() {
  const [count, setCount] = useState(1);
  const [selectedExtra, setSelectedExtra] = useState([]);
  const [sum, setSum] = useState(0);
  const [radioSelect, setRadioSelect] = useState(null);
  const [crustThickness, setCrustThickness] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [notes, setNotes] = useState("");
  const [size, setSize] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      console.log("Form eksik ya da hatalı");
      return;
    }
    history.push("/Success");
    const formData = {
      name: nameSurname,
      adet: { count },
      size: size,
      crust: crustThickness,
      extras: selectedExtra,
      total: sum,
      note: notes,
    };
    axios
      .post("https://reqres.in/api/pizza", formData)
      .then((response) => {
        console.log("Sipariş Özeti:", response.data);
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error);
      });
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
    setSize(event.target.id);
  };

  const handleCrustChange = (event) => {
    setCrustThickness(event.target.value);
  };
  const handleNameChange = (event) => {
    setNameSurname(event.target.value);
  };
  const handleNoteChange = (event) => {
    setNotes(event.target.value);
  };

  const totalSelectedEx = selectedExtra.length * 5;

  const crustPrice =
    crustThickness === "ince"
      ? 10
      : crustThickness === "normal"
        ? 0
        : crustThickness === "kalın"
          ? 15
          : 0;

  const resultSum = () => {
    let total =
      pizzaData.price +
      totalSelectedEx +
      (Number(radioSelect) || 0) +
      crustPrice;
    if (count > 0) {
      total *= count;
      setSum(total);
    }
  };

  useEffect(() => {
    resultSum();
  }, [count, selectedExtra, radioSelect, crustThickness]);

  const isFormValid =
    radioSelect !== null &&
    crustThickness !== "" &&
    crustThickness !== "Hamur Kalınlığı" &&
    selectedExtra.length > 3 && nameSurname.length>0;

  return (
    <Form onSubmit={handleSubmit} className="form-container text-start">
      <FormGroup className="form-group-container">
        <p className="bold-text">{pizzaData.name}</p>
        <Row className="info-row d-flex align-items-center">
          <Col className="info-col text-start">
            <span className="bold-text fw-bold">
              {pizzaData.price.toFixed(2)}₺
            </span>
          </Col>
          <Col className="info-col light-text d-flex justify-content-end">
            <div className="w-50 d-flex justify-content-between ms-5">
              <span>{pizzaData.size}</span>
              <span>{pizzaData.gram}</span>
            </div>
          </Col>
        </Row>
        <FormText className="light-text expl-text">{pizzaData.text}</FormText>
      </FormGroup>
      <Row className="info-row">
        <Col className="info-col">
          <FormGroup className="text-start">
            <p className="bold-text">Boyut Seçimi</p>
            {pizzaData.sizeChoose.map((boyut, index) => (
              <div key={index}>
                <Input
                  type="radio"
                  name="boyut"
                  id={boyut}
                  value={boyut === "orta" ? 40 : boyut === "büyük" ? 70 : 0}
                  onChange={handleRadioChange}
                  required
                />
                <Label for={boyut} className="light-text ">
                  {boyut.charAt(0).toUpperCase() + boyut.slice(1)}
                </Label>
              </div>
            ))}
          </FormGroup>
        </Col>
        <Col className="info-col">
          <FormGroup className="text-start">
            <Label for="crust-thickness" className="bold-text">
              Hamur Seç
            </Label>
            <Input
              id="crust-thickness"
              name="select"
              type="select"
              onChange={handleCrustChange}
              className="w-75 light-text"
              required
            >
              <option className="light-text">Hamur Kalınlığı</option>
              {pizzaData.crustThickness.map((thickness, index) => (
                <option className="light-text " key={index} value={thickness}>
                  {thickness.charAt(0).toUpperCase() + thickness.slice(1)}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup className="text-start">
        <p className="bold-text">Ek Malzemeler</p>
        <p className="light-text ">
          En Fazla 10 malzeme seçebilirsiniz. Lütfen en az 4 malzeme seçin (5₺)
        </p>
        <Row className="info-row mobile-check">
          {pizzaData.extMal.map((extCheck, index) => (
            <Col
              key={index}
              xs="5"
              sm="4"
              className="info-col text-start d-flex align-items-center checks"
            >
              <FormGroup check inline>
                <Input
                  type="checkbox"
                  id={`extCheck-${index}`}
                  value={extCheck}
                  checked={selectedExtra.includes(extCheck)}
                  onChange={handleSelectChange}
                  disabled={
                    selectedExtra.length >= 10 &&
                    selectedExtra.length < 4 &&
                    !selectedExtra.includes(extCheck)
                  }
                />
                <Label className="medium-text" check for={`extCheck-${index}`}>
                  {extCheck}
                </Label>
              </FormGroup>
            </Col>
          ))}
        </Row>
      </FormGroup>
      <FormGroup>
        <Label for="isim" className="bold-text">
          Adınız Soyadınız:
        </Label>
        <Input
          id="isim"
          name="isim"
          placeholder="Lütfen adınızı ve soyadınızı girin"
          className="light-text"
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="order-note" className="bold-text">
          Sipariş Notu
        </Label>
        <Input
          id="order-note"
          name="order-note"
          placeholder="Siparişine eklemek istediğin bir not var mı?"
          className="light-text no-resize"
          type="textarea"
          onChange={handleNoteChange}
        />
      </FormGroup>
      <hr />
      <FormGroup className="info-form">
        <div className="counting">
          <Button color="warning" className="counting-item" onClick={decrement}>
            -
          </Button>
          <div className="counting-item counting-item-number">{count}</div>
          <Button color="warning" className="counting-item" onClick={increment}>
            +
          </Button>
        </div>
        <Card className="result-sum result-sum-card">
          <CardBody className="result-sum-card">
            <p className="bold-text result-header-text">Sipariş Toplamı</p>
            <div className="result-text">
              <div className="result-exp">
                <span>{`Seçimler: `}</span>
                <span>{`${totalSelectedEx.toFixed(2)}₺`}</span>
              </div>
              <div className="result-exp red-text">
                <span>{`Toplam: `}</span>
                <span>{`${sum.toFixed(2)}₺`}</span>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="submit">
          <Button
            color="warning"
            className="submit-button"
            disabled={!isFormValid}
          >
            SİPARİŞ VER
          </Button>
        </div>
      </FormGroup>
    </Form>
  );
}
