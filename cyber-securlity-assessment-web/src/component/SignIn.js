import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import { Button } from "react-bootstrap";
import i18n from "../i18n"
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const [t, i18n] = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    await firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .catch((error) => {
        alert(t("AlertEmailPassWrong"));
      });
  };

  const { currentUser } = useContext(AuthContext);
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
        <h1 className="text-center">{t("Signin")}</h1>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/safetyassessmentapp.appspot.com/o/images%2FImageInApp%2Fcaa-icon.png?alt=media&token=7acb47bd-9401-4dc2-8c3e-9edd7d88cdd2"
          className="img-fluid rounded mx-auto d-block"
          alt=""
        />
        <h5 className="text-center">Cyber Security Assessment</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">{t("EmailAddress")}</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder={t("EnterEmailAddress")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">{t("Password")}</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder={t("EnterPassword")}
            />
          </div>
          <div className="d-grid gap-2">
            <Button type="submit" className="btn btn-primary">
            {t("Signin")}
            </Button>
          </div>
          <div className="d-flex mt-3">
            <div>
              <Link to="/signup">{t("SignUp")}</Link>
            </div>
            <div className="ml-auto">
              <Link to="/ResetPass">{t("ResetPass")}</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
