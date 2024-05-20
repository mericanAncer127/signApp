import * as React from "react";
import { ISignPosition } from "MyTypes";
import { drawImage, drawRect } from "../util/canvasTool";
import { genSignInitState, createImage, isPC, noop } from "../util/help";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";

const { useCallback, useState } = React;

export const useEditPdf = (
  curPdfCanvas: HTMLCanvasElement,
  isPdfEndLoadRef: React.MutableRefObject<boolean>
) => {
  const [selectSign, saveSelectSign] = useState<ISignPosition | undefined>();
  const [signList, updateSignList] = useState<ISignPosition[]>([]);
  const [pdfReadBuffer, savePdfReadBuffer] = useState<ArrayBuffer | null>(null);

  React.useEffect(() => {
    // downloadPdf();
  }, [pdfReadBuffer]);
  const downloadPdf = useCallback(async () => {
    if (!pdfReadBuffer) return;
    const newPdfDoc = await PDFDocument.load(pdfReadBuffer as ArrayBuffer);
    const pagesProcesses = newPdfDoc
      .getPages()
      ?.map(async (page, pageIndex) => {
        const { width, height } = page.getSize();
        const signs = signList.filter((sign) => sign.pageIndex === pageIndex);
        const drawIntoPageTask = signs.map(async (sign) => {
          let { signSrc, x, y, w, h, pdfCanvas } = sign;
          const scale = pdfCanvas.width / width;
          const ex = x / scale;
          const ey = y / scale;
          try {
            let img = await newPdfDoc.embedPng(signSrc as string);
            return () =>
              page.drawImage(img, {
                x: ex,
                y: height - ey - h / scale,
                width: w / scale,
                height: h / scale,
              });
          } catch (e) {
            return noop;
          }
        });
        const drawProcesses = await Promise.all(drawIntoPageTask);
        drawProcesses.forEach((p) => p());
      });
    await Promise.all(pagesProcesses);
    const pdfBytes = await newPdfDoc.save();
    download(pdfBytes, "download", "application/pdf");
  }, [pdfReadBuffer, signList]);
  // 上传pdf
  const uploadPdf = useCallback(async (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const arrayBuffer = await file.arrayBuffer();

      if (file && file instanceof Blob) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          const arrayBuffer: any = reader.result;
          savePdfReadBuffer(arrayBuffer);
          // Do something with arrayBuffer
        };
        reader.onerror = function (error) {
          console.error("Error reading file:", error);
        };
      } else {
        console.error("Selected file is not a Blob or File type");
      }

      isPdfEndLoadRef.current = false;

      // downloadPdf();
    }
  }, []);
  return {
    // addSignInCanvas,
    // deleteSignInCanvas,
    downloadPdf,
    uploadPdf,
    saveSelectSign,
    signList,
    updateSignList,
    pdfReadBuffer,
  };
};
