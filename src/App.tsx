import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import "./App.css";
import MyPDFViewr from "./components/PDFViewer/myPDFViewer";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/sign" />} />
            {/* <Route path="sign" element={<MyPDFViewr />} /> */}
          </Routes>
          {/* <CalendarPage /> */}
          {/* </Route> */}
        </main>
      </React.Fragment>
    </Router>
  );
}

export default App;
