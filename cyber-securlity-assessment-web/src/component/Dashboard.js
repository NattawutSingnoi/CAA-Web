import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { Button, Card } from "react-bootstrap";

const Dashboard = () => {
  const [t, i18n] = useTranslation();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //เช็คว่าได้เข้าสู่ระบบมาหรือไม่ ถ้าไม่จะไปหน้าเข้าสู่ระบบ
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  //เช็คว่าอีเมลยืนยันแล้ว
  const checkEmailVerified = (user) => {
    firebaseConfig.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (user.emailVerified === true) {
          navigate(t("NavBtnAssessment"));
        } else {
          alert(t("AlertEmailChack"));
        }
      }
    });
  };

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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={checkEmailVerified}>{t("Assessment")}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown
                title="Language"
                id="basic-nav-dropdown"
                menuVariant="primary"
                className="mx-3 my-auto"
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
              <button
                onClick={() => firebaseConfig.auth().signOut()}
                className="btn btn-danger"
              >
                {t("SignOut")}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container py-3 px-2">
        <Card>
          <Card.Header as="h5">{t("PDPAtitleScreen")}</Card.Header>
          <Card.Body>
            <Card.Title>{t("PDPAtitleContent")}</Card.Title>
            <Card.Text>{t("PDPAdisContent")}</Card.Text>
            <Card.Text>{t("PDPAdisContent2")}</Card.Text>
            <Card.Text>{t("PDPAdisContent3")}</Card.Text>
            <br />
            <Card.Title>{t("PDPAtitleContent2")}</Card.Title>
            <Card.Text>{t("PDPAdisContent4")}</Card.Text>
            <br />
            <Card.Title>{t("PDPAtitleContent3")}</Card.Title>
            <Card.Text>{t("PDPAdisContent5")}</Card.Text>
            <br />
            <Card.Title>{t("PDPAtitleContent4")}</Card.Title>
            <Card.Text>{t("PDPAdisContent6")}</Card.Text>
            <br />
            <Button
              className="justify-content-end"
              variant="primary"
              href="http://www.ratchakitcha.soc.go.th/DATA/PDF/2562/A/069/T_0052.PDF"
            >
              {t("more")}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
