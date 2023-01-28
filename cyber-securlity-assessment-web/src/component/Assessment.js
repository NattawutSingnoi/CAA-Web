import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AssessmentShow from "./AssessmentShow";

const Assessment = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();//เปลี่ยนหน้า

  //เช็คว่าได้เข้าสู่ระบบมาหรือไม่ ถ้าไม่จะไปหน้าเข้าสู่ระบบ
  if (!currentUser) {
    return <Navigate to="/" />;
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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => (navigate('/Dashboard'))}>หน้าหลัก</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <button
                onClick={() => firebaseConfig.auth().signOut()}
                className="btn btn-danger"
              >
                ออกจากระบบ
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container pt-2 px-2">
        <AssessmentShow />
      </div>
    </div>
  );
};

export default Assessment;
