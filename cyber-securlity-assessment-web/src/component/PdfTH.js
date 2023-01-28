import React, { useContext, useRef, useState } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";

const PdfTH = () => {
  const navigate = useNavigate(); //เปลี่ยนหน้า
  const componentRef = useRef();
  const importToPdf = useLocation(); //รับค่าที่ส่งมาจากหน้า Assessment.js
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [scoreSum] = useState(importToPdf.state.scoreCount);
  const { currentUser } = useContext(AuthContext);
  //เช็คว่าได้เข้าสู่ระบบมาหรือไม่ ถ้าไม่จะไปหน้าเข้าสู่ระบบ
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  //คำตอบแทนคะแนน
  function answer(score, i) {
    if (score[i] === 2) {
      return "สอดคล้อง";
    } else if (score[i] === 1) {
      return "ปฎิบัติตามบางส่วน";
    } else if (score[i] === 0) {
      return "ไม่ปฎิบัติตาม";
    }
  }

  //คำแนะนำ
  //เทียบคะแนน เกณฑ์
  function counsel(sum) {
    if (importToPdf.state.resultSymbol === ">") {
      if (sum > importToPdf.state.resultScore) {
        return importToPdf.state.resultCounsel;
      } else {
        return importToPdf.state.resultCounselElse;
      }
    } else if (importToPdf.state.resultSymbol === ">=") {
      if (sum >= importToPdf.state.resultScore) {
        return importToPdf.state.resultCounsel;
      } else {
        return importToPdf.state.resultCounselElse;
      }
    } else if (importToPdf.state.resultSymbol === "<") {
      if (sum < importToPdf.state.resultScore) {
        return importToPdf.state.resultCounsel;
      } else {
        return importToPdf.state.resultCounselElse;
      }
    } else if (importToPdf.state.resultSymbol === "<=") {
      if (sum <= importToPdf.state.resultScore) {
        return importToPdf.state.resultCounsel;
      } else {
        return importToPdf.state.resultCounselElse;
      }
    } else if (importToPdf.state.resultSymbol === "=") {
      if ((sum = importToPdf.state.resultScore)) {
        return importToPdf.state.resultCounsel;
      } else {
        return importToPdf.state.resultCounselElse;
      }
    }
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
              <Nav.Link onClick={() => navigate("/Dashboard")}>
                หน้าหลัก
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/Assessment")}>
                แบบประเมิน
              </Nav.Link>
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
      <div className="container pt-2">
        <div className="col-sm-12 mb-2">
          <div className="card">
            <div className="card-body">
              <h5 className="text-center">ข้อมูลที่จะสร้างเป็น PDF</h5>
              <div ref={componentRef}>
                <h1 className="text-center mt-5">Cyber Security Assessment</h1>
                <h2 className="font-weight-normal my-5 ml-5">
                  {importToPdf.state.title}
                </h2>
                {importToPdf.state.Assessment.map((Assessments, index) => (
                  <div key={Assessments.id}>
                    <h3 className="font-weight-normal ml-5">
                      {index + 1}. {Assessments.data.AssessmentAnswer}
                    </h3>
                    <h3 className="font-weight-normal ml-5">
                      คำตอบ : {answer(importToPdf.state.scoreCount,index)}
                    </h3>
                    {importToPdf.state.noteAnswer[index] !== undefined ? (
                      <h3 className="font-weight-normal mb-5 ml-5">
                        หมายเหตุ : {importToPdf.state.noteAnswer[index]}
                      </h3>
                    ) : (
                      <p className="font-weight-normal mb-5 ml-5"></p>
                    )}
                  </div>
                ))}
                {importToPdf.state.image !== undefined ? (
                  <Image
                    src={URL.createObjectURL(importToPdf.state.image)}
                    className="img mb-5 ml-5"
                    width="auto"
                    height="200"
                  />
                ) : null}
                <h3 className="font-weight-normal mb-5 ml-5">
                  คำแนะนำ :{" "}
                  {counsel(
                    scoreSum.reduce(
                      (previousValue, currentValue, index) =>
                        previousValue + currentValue,
                      0
                    )
                  )}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 mb-2">
          <Button className="btn btn-primary mb-2 w-100" onClick={handlePrint}>
            บันทึกเป็นไฟล์ PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PdfTH;
