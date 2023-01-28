import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Assessment from "./component/Assessment";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { AuthProvider } from "./component/Auth";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ResetPass from "./component/ResetPass";
import PlayAssessment from "./component/PlayAssessment";
import PdfTH from "./component/PdfTH";
import AssessmentEng from "./component/AssessmentEng";
import PlayAssessmentEng from "./component/PlayAssessmentEng";
import PdfEng from "./component/PdfEng";

function App() {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/Assessment" element={<Assessment />} />
            <Route exact path="/PlayAssessment" element={<PlayAssessment />} />
            <Route exact path="/AssessmentEng" element={<AssessmentEng />} />
            <Route exact path="/PlayAssessmentEng" element={<PlayAssessmentEng />} />
            <Route exact path="/SignUp" element={<SignUp />} />
            <Route exact path="/ResetPass" element={<ResetPass />} />
            <Route exact path="/PdfTH" element={<PdfTH />} />
            <Route exact path="/PdfEng" element={<PdfEng />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;
