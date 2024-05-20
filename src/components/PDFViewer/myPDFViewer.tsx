import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import SaveIcon from "@mui/icons-material/Save";
import download from "downloadjs";
// import PDFViewer from "pdf-viewer-reactjs";
import { PDFViewer } from "react-view-pdf";
import { Document, Page } from "react-pdf-simple-viewer";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import store from "../../store/store";

import SignEditor from "../../containers/signEditor";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { SignElement, SignResource } from "../../types";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";
import { InputFileUpload, VisuallyHiddenInput } from "./styles";

const MyPDFViewer: React.FC = () => {
  const [existingPdfBytes, setExistingPDFBytes] = useState<any>();
  const [pages, setPages] = useState<number[]>([]);

  const [entireHeight, setEntireHeight] = useState<number>(0);
  const [entireWidth, setEntireWidth] = useState<number>(0);
  const [widthArray, setWidthArray] = useState<Array<number>>([]);
  const pdfRef = useRef<HTMLDivElement>(null);

  const signElements: SignElement[] = useSelector(
    (state: any) => state.event.signs
  );

  const [url, setUrl] = useState<any>();
  const downloadPdf = async () => {
    await modifyPdf();
  };

  const uploadPdf = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getEntireHeight_Width = async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching PDF: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    setExistingPDFBytes(arrayBuffer);

    // setExistingPdfBytes(arrayBuffer);

    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    let totalHeight = 0;
    let maxWidth = 0;
    for (let i = 0; i < pages.length; i++) {
      const { width, height } = pages[i]?.getSize();
      setWidthArray([...widthArray, width]);
      maxWidth = maxWidth < width ? width : maxWidth;

      totalHeight += height;
    }
    setEntireHeight(totalHeight);
    setEntireWidth(maxWidth);
  };

  useEffect(() => {
    const fetchPdfBytes = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching PDF: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        setExistingPDFBytes(arrayBuffer);
        // addSignEditors();
      } catch (error) {
        console.error("Error while fetching the PDF:", error);
      }
    };

    if (url) {
      fetchPdfBytes(url);
    }

    // Cleanup the URL object when the component unmounts or when url changes
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  const modifyPdf = async () => {
    const fetchPdfBytes = async (url: string) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      // setExistingPdfBytes(arrayBuffer);

      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
      const getPageIndex = (posY: number | undefined) => {
        let totalHeight = 0;
        for (let i = 0; i < pages.length; i++) {
          const currentPage = pages[i];
          const { height } = currentPage.getSize();
          if (posY && totalHeight + height > posY)
            return { pageIndex: i, pageHeight: height, totalHeight };
          totalHeight += height;
        }
        return {
          pageIndex: pages.length - 1,
          pageHeight: pages[pages.length - 1].getSize().height,
          totalHeight,
        };
      };

      const resources: any = signElements.map((sign) => sign.resource);
      resources.forEach(async (resource: SignResource) => {
        const image: any = await pdfDoc.embedPng(resource?.image);
        if (image) {
          const { pageIndex, pageHeight, totalHeight }: any = getPageIndex(
            resource?.y
          );
          const currentPage = pages[pageIndex];

          if (resource && resource.x && resource.y && resource.h) {
            const yPositionOnPage =
              totalHeight + pageHeight - resource.y - resource.h;

            currentPage?.drawImage(image, {
              x: resource.x,
              y: yPositionOnPage,
              width: resource.w,
              height: resource.h,
            });
          }
        }
      });

      const pdfBytes = await pdfDoc.save();

      download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    };

    if (url) {
      fetchPdfBytes(url);
    }
  };

  return (
    <div>
      {!url ? (
        <InputFileUpload uploadPdf={uploadPdf} />
      ) : (
        <>
          {existingPdfBytes && (
            <div style={{ height: "500px", width: "100%" }}>
              <div ref={pdfRef}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Document
                    URL={url}
                    onSuccess={async (PDF) => {
                      const { numPages } = PDF;
                      setPages(
                        Array.from({ length: numPages })
                          .fill(0)
                          .map((val, index) => index + 1)
                      );
                      getEntireHeight_Width();
                    }}
                  >
                    <SignEditor
                      entireWidth={entireWidth}
                      entireHeight={entireHeight}
                    />

                    {pages.map((value, index) => {
                      return (
                        <Page
                          style={{ border: "1px solid green" }}
                          index={value}
                          key={value}
                          width={widthArray[index]}
                          scale={1}
                        ></Page>
                      );
                    })}
                    {url && (
                      <IconButton
                        style={{
                          position: "fixed",
                          backgroundColor: "blue",
                          zIndex: 10,
                          right: 100,
                          top: 100,
                        }}
                        onClick={downloadPdf}
                      >
                        <SaveIcon style={{ color: "white" }} />
                      </IconButton>
                    )}
                  </Document>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyPDFViewer;
