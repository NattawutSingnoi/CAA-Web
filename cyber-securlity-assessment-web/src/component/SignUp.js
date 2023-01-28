import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import firebaseConfig from "../config";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Form } from "react-bootstrap";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const [t, i18n] = useTranslation();
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sliderScore, setSliderScore] = useState(0);
  const [captchaScore] = useState(Math.floor(1 + Math.random() * 9));

  const handleSubmit = async () => {
    if (captchaScore === parseInt(sliderScore, 10)) {
      if (email !== "" && password !== "") {
        if (password === confirmPassword) {
          if (password.length >= 8) {
            await firebaseConfig
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {
                // send verification mail.
                userCredential.user.sendEmailVerification();
                alert(t("AlerAfterSignup"));
                setCurrentUser(true);
              })
              .catch((error) => {
                alert(t("AlertEmailWrong"));
              });
          } else {
            alert(t("AlertPassShort"));
          }
        } else {
          alert(t("AlertPassIncorrect"));
        }
      } else {
        alert(t("AlertEmailPassEmt"));
      }
    } else {
      alert(t("AlertNumber"));
    }
  };

  if (currentUser) {
    return <Navigate to="/Dashboard" />;
  }
  return (
    <div>
      <Navbar style={{position: "sticky"}} variant="dark" fixed="top" bg="primary" expand="lg">
        <Container className="pl-3 pr-3">
          <Navbar.Brand className="pr-3">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/safetyassessmentapp.appspot.com/o/images%2FImageInApp%2Fic_launcher_round.png?alt=media&token=8eef15de-5fae-4c9b-a362-cf70385eff44"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown
                title="Language"
                id="basic-nav-dropdown"
                menuVariant="primary"
              >
                <NavDropdown.Item
                  onClick={() => {
                    i18n.changeLanguage("th");
                  }}
                >
                  TH
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  ENG
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-5">
        <h1 className="text-center">{t("SignUp")}</h1>
        <Form.Group className="my-3" controlId="formBasicEmail">
          <Form.Label>{t("EmailAddress")}</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("EnterEmailAddress")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("EnterPassword")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>{t("ConfirmPassword")}</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t("EnterConfirmPassword")}
          />
        </Form.Group>
        <div>
          <div className="d-grid">
            <p className="text-center">
              {t("AlertNumber")}
            </p>
            <p className="text-center">
              {captchaScore} = {sliderScore}
            </p>
            <Form.Range
              className="mb-3"
              value={sliderScore}
              onChange={(e) => setSliderScore(e.target.value)}
              min={0}
              max={10}
            />
            <Button className="btn btn-primary" onClick={handleSubmit}>
              {t("SignUp")}
            </Button>
          </div>
          <p className="text-center mt-3">
            {t("BackTo")}
            <Link to="/">{t("Signin")}</Link>
            {t("BackToPage")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
