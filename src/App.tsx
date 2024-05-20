import * as React from "react";
import "./global.less";
import { isPC } from "./util/help";
import { useCloneSignCanvas, useDrawSignInCanvas, useEditPdf } from "./hooks/";
import MyPDFViewer from "./components/PDFViewer/myPDFViewer";
import SignEditor from "./containers/signEditor";
// import PDFViewer from "pdf-viewer-reactjs";

const { useState, useCallback, useRef } = React;

const App = () => {
  return (
    <div className={`${isPC ? "pcMode" : ""}`}>
      <div className="pdf-wrap">
        <MyPDFViewer />
      </div>
    </div>
  );
};
export default App;
