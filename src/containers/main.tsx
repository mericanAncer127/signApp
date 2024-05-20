import React, { ChangeEvent, Component, useRef, useState } from "react";

import { PDFDocument } from "pdf-lib";
import SignatureCanvas from "react-signature-canvas";
import {
  FaPencilAlt,
  FaEraser,
  FaSpinner,
  FaFileSignature,
} from "react-icons/fa";

import { SignContainer, PdfContainer, SignButton, Container } from "./styles";

const Main: React.FC = () => {
  const [signing, setSigning] = useState<boolean>(false);
  const [pdf, setPdf] = useState<string | null>(null);
  const sigPad = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigPad.current?.clear();
  };

  const trim = async () => {
    if (!sigPad.current) return;

    setSigning(true);

    const trimmedDataURL = sigPad.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    if (pdf) {
      try {
        const pdfDoc = await PDFDocument.load(pdf);
        const pngImage = await pdfDoc.embedPng(trimmedDataURL);
        const pngDims = pngImage.scale(0.17);

        const pages = pdfDoc.getPages();
        pages.forEach((page) => {
          page.drawImage(pngImage, {
            x: 120,
            y: 59,
            width: pngDims.width,
            height: pngDims.height,
          });
        });

        const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
        setPdf(pdfBytes);
      } catch (error) {
        console.error("Error while trimming and embedding image:", error);
      } finally {
        setSigning(false);
      }
    } else {
      setSigning(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPdf(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Container>
      <h1>
        <FaFileSignature />
        PDF Signaturer
        <input type="file" onChange={handleChange} />
      </h1>

      <PdfContainer>
        <iframe title="pdframe" src={pdf || ""} />
      </PdfContainer>

      <SignContainer>
        <SignatureCanvas penColor="black" ref={sigPad} />
        <div>
          <button type="button" onClick={clear} disabled={signing}>
            <FaEraser color="#fff" size={14} />
          </button>
          <SignButton onClick={trim} disabled={signing} loading={true}>
            {signing ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPencilAlt color="#fff" size={14} />
            )}
          </SignButton>
        </div>
      </SignContainer>
    </Container>
  );
};

export default Main;
