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
  sizeChoose: ["S", "M", "L"],
  crustThickness: ["ince", "normal", "kalın"],
};

export default function FormContainer({ setOrderData }) {
  const [count, setCount] = useState(1);
  const [selectedExtra, setSelectedExtra] = useState([]);
  const [sum, setSum] = useState(0);
  const [radioSelect, setRadioSelect] = useState(null);
  const [crustThickness, setCrustThickness] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [notes, setNotes] = useState("");
  const [size, setSize] = useState("");
  const [hizliTeslimat, setHizliTeslimat] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({
    size: false,
    crust: false,
    ext: false,
    nameArea: false,
  });
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      console.log("Form eksik ya da hatalı");
      return;
    } else {
      const pizzaName = pizzaData.name;
      const formData = {
        pizzaName: pizzaName,
        name: nameSurname,
        adet: count,
        size: size,
        crust: crustThickness,
        extras: selectedExtra,
        extPrice: totalSelectedEx.toFixed(2),
        total: sum.toFixed(2),
        note: notes,
        teslimat: hizliTeslimat ? "İstiyorum" : "İstemiyorum",
      };
      axios
        .post("https://reqres.in/api/pizza", formData)
        .then((response) => {
          console.log("Sipariş Özeti:", response.data);
          setOrderData(response.data);
          history.push("/success");
        })
        .catch((error) => {
          console.error("Bir hata oluştu:", error);
        });
    }
  };

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 1 ? count - 1 : 1);

  const handleSelectChange = (event) => {
    const selectedEx = event.target;
    if (selectedEx.name === "extCheck") {
      setSelectedExtra((checked) => {
        if (checked.includes(selectedEx.value)) {
          return checked.filter((item) => item !== selectedEx.value);
        } else {
          return [...checked, selectedEx.value];
        }
      });
      setTouched((prev) => ({ ...prev, ext: true }));
    } else {
      if (hizliTeslimat) {
        setHizliTeslimat(false);
        return;
      } else {
        setHizliTeslimat(true);
      }
    }
  };

  const handleRadioChange = (event) => {
    const selectedRadio = event.target;
    setRadioSelect(Number(selectedRadio.value));
    setSize(event.target.id);
    setTouched((prev) => ({ ...prev, size: true }));
  };

  const handleCrustChange = (event) => {
    setCrustThickness(event.target.value);
    setTouched((prev) => ({ ...prev, crust: true }));
  };
  const handleNameChange = (event) => {
    setNameSurname(event.target.value);
    setTouched((prev) => ({ ...prev, nameArea: true }));
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
    if (hizliTeslimat) {
      total += 50;
    }
    total *= count;
    setSum(total);
  };

  useEffect(() => {
    resultSum();
  }, [count, selectedExtra, radioSelect, crustThickness, hizliTeslimat]);

  useEffect(() => {
    const error = {};
    const errorMessages = {
      size: "Lütfen pizza boyutunu seçin",
      crust: "Lütfen hamur kalınlığını seçin",
      ext: "Lütfen en az 4 adet extra malzeme seçin",
      nameArea: "Lütfen adınızı soyadınızı giriniz",
      ext10: "En fazla 10 adet malzeme seçebilirsiniz.",
    };

    if (radioSelect === null) {
      error.size = errorMessages.size;
    }
    if (crustThickness === "Hamur Kalınlığı") {
      error.crust = errorMessages.crust;
    }
    if (selectedExtra.length < 4) {
      error.ext = errorMessages.ext;
    }
    if (selectedExtra.length > 10) {
      error.ext10 = errorMessages.ext10;
    }
    if (!nameSurname.trim().includes(" ") || nameSurname.length < 4) {
      error.nameArea = errorMessages.nameArea;
    }

    setErrors(error);
    setIsValid(
      radioSelect !== null &&
        crustThickness !== "Hamur Kalınlığı" &&
        selectedExtra.length >= 4 &&
        selectedExtra.length < 11 &&
        nameSurname.trim().includes(" ") &&
        nameSurname.trim().length > 4 &&
        touched.crust !== false
    );
  }, [
    count,
    selectedExtra,
    radioSelect,
    crustThickness,
    nameSurname,
    hizliTeslimat,
  ]);

  return (
    <Form
      onSubmit={handleSubmit}
      className="form-container text-start"
      data-cy="pizza-order-form"
    >
      <FormGroup className="form-group-container">
        <p className="bold-text" data-cy="pizza-name">
          {pizzaData.name}
        </p>
        <Row className="info-row d-flex align-items-center">
          <Col className="info-col text-start">
            <span className="bold-text fw-bold" data-cy="pizza-price">
              {pizzaData.price.toFixed(2)}₺
            </span>
          </Col>
          <Col className="info-col light-text d-flex justify-content-end">
            <div className="w-50 d-flex justify-content-between ms-5">
              <span data-cy="pizza-size">{pizzaData.size}</span>
              <span data-cy="pizza-gram">{pizzaData.gram}</span>
            </div>
          </Col>
        </Row>
        <FormText className="light-text expl-text" data-cy="pizza-description">
          {pizzaData.text}
        </FormText>
      </FormGroup>

      <Row className="info-row">
        <Col className="info-col">
          <p className="bold-text">
            Boyut Seç <span className="red-text">*</span>
          </p>
          <FormGroup className="text-start d-flex">
            {pizzaData.sizeChoose.map((boyut, index) => (
              <div key={index} className="radio-container">
                <Input
                  type="radio"
                  name="boyut"
                  id={boyut}
                  value={boyut === "M" ? 40 : boyut === "L" ? 70 : 0}
                  onChange={handleRadioChange}
                  invalid={!!errors.size && touched.size}
                  className="radio-button"
                  data-cy={`radio-${boyut}`}
                  required
                />
                <Label for={boyut} className="label-radio">
                  {boyut}
                </Label>
              </div>
            ))}
            {touched.size && errors.size && (
              <p className="red-text" data-cy="error-size">
                {errors.size}
              </p>
            )}
          </FormGroup>
        </Col>

        <Col className="info-col">
          <FormGroup className="text-start">
            <Label for="crust-thickness" className="bold-text">
              Hamur Seç <span className="red-text">*</span>
            </Label>
            <div>
              {touched.crust && errors.crust && (
                <p className="red-text" data-cy="error-crust">
                  {errors.crust}
                </p>
              )}
              <Input
                id="crust-thickness"
                name="select"
                type="select"
                onChange={handleCrustChange}
                className="w-75 medium-text select-container"
                invalid={!!errors.crust && touched.crust}
                data-cy="crust-thickness"
                required
              >
                <option className="light-text">Hamur Kalınlığı</option>
                {pizzaData.crustThickness.map((thickness, index) => (
                  <option className="light-text" key={index} value={thickness}>
                    {thickness.charAt(0).toUpperCase() + thickness.slice(1)}
                  </option>
                ))}
              </Input>
            </div>
          </FormGroup>
        </Col>
      </Row>

      <FormGroup className="text-start">
        <p className="bold-text">
          Ek Malzemeler <span className="red-text">*</span>
        </p>
        <p className="light-text ">
          En Fazla 10 malzeme seçebilirsiniz. Lütfen en az 4 malzeme seçin (5₺)
        </p>
        {touched.ext && errors.ext && (
          <p className="red-text" data-cy="error-extra">
            {errors.ext}
          </p>
        )}
        {errors.ext10 && (
          <p className="red-text" data-cy="error-extra">
            {errors.ext10}
          </p>
        )}
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
                  name="extCheck"
                  id={`extCheck-${index}`}
                  value={extCheck}
                  checked={selectedExtra.includes(extCheck)}
                  onChange={handleSelectChange}
                  data-cy={`checkbox-${extCheck}`}
                  className="custom-check"
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
          Adınız Soyadınız: <span className="red-text">*</span>
        </Label>
        {touched.nameArea && errors.nameArea && (
          <p className="red-text" data-cy="error-name">
            {errors.nameArea}
          </p>
        )}
        <Input
          id="isim"
          name="isim"
          placeholder="Lütfen adınızı ve soyadınızı girin"
          className="light-text"
          invalid={!!errors.nameArea && touched.nameArea}
          onChange={handleNameChange}
          data-cy="isim"
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
          data-cy="order-note"
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="checkbox"
          id="teslimat"
          name="teslimat"
          checked={hizliTeslimat}
          onChange={handleSelectChange}
          data-cy="teslimat"
          className="custom-check"
        />
        <Label for="teslimat" className="medium-text red-text">
          Hızlı Teslimat (50₺)
        </Label>
      </FormGroup>

      <hr />

      <FormGroup className="info-form">
        <div className="counting">
          <Button
            color="warning"
            className="counting-item"
            onClick={decrement}
            data-cy="decrement-button"
          >
            -
          </Button>
          <div
            className="counting-item counting-item-number"
            data-cy="item-count"
          >
            {count}
          </div>
          <Button
            color="warning"
            className="counting-item"
            onClick={increment}
            data-cy="increment-button"
          >
            +
          </Button>
        </div>

        <Card className="result-sum result-sum-card">
          <CardBody className="result-sum-card">
            <p
              className="bold-text result-header-text"
              data-cy="order-total-title"
            >
              Sipariş Toplamı
            </p>
            <div className="result-text">
              <div className="result-exp">
                <span>{`Seçimler: `}</span>
                <span data-cy="selected-items-price">{`${totalSelectedEx.toFixed(2)}₺`}</span>
              </div>
              <div className="result-exp red-text">
                <span>{`Toplam: `}</span>
                <span data-cy="total-price">{`${sum.toFixed(2)}₺`}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="submit">
          <Button
            color="warning"
            className="submit-button"
            disabled={!isFormValid}
            data-cy="submit-button"
          >
            SİPARİŞ VER
          </Button>
        </div>
      </FormGroup>
    </Form>
  );
}
