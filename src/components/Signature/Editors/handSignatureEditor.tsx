import React, { CSSProperties, useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  FaPencilAlt,
  FaEraser,
  FaSpinner,
  FaFileSignature,
} from "react-icons/fa";

import { SignElement } from "../../../types";
import { SignContainer, SignButton } from "./style";

interface HandSignatureEditorProps {
  sign: SignElement;
  style: CSSProperties | undefined;
  onChangeContent: (content: any) => void;
}

const isImgTag = (element: any) => {
  return element?.type === "img";
};

const HandSignatureEditor: React.FC<HandSignatureEditorProps> = (props) => {
  const { style, onChangeContent, sign } = props;

  useEffect(() => {
    if (sigPad.current && InitialImage) {
      const canvas = sigPad.current.getCanvas();
      const ctx: any = canvas.getContext("2d");
      // const img: any = imgRef.current;
      const img = new Image();
      img.src = InitialImage.props.src;

      const width = 300;
      const height = 100;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
      };

      // If the image is already loaded (cached), draw it immediately
      if (img.complete) {
        ctx.drawImage(img, 0, 0, width, height);
      }
    }
  }, []);
  const [signing, setSigning] = useState<boolean>(false);
  // const [pdf, setPdf] = useState<string | null>(null);
  const sigPad = useRef<SignatureCanvas>(null);

  const InitialImage = isImgTag(sign.content) ? sign.content : false;

  const clear = () => {
    sigPad.current?.clear();
  };
  const trim = async () => {
    if (!sigPad.current) return;

    setSigning(true);

    const trimmedDataURL = sigPad.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    if (sign) {
      try {
        const content = <img src={trimmedDataURL} width={300} height={100} />;
        onChangeContent(content);
      } catch (error) {
        console.error("Error while trimming and embedding image:", error);
      } finally {
        setSigning(false);
      }
    } else {
      setSigning(false);
    }
  };

  const handleStartDateTimeChange = () => {};
  return (
    <div style={style}>
      <SignContainer>
        <SignatureCanvas penColor="black" ref={sigPad} />
        <div>
          <button type="button" onClick={clear} disabled={signing}>
            <FaEraser color="#fff" size={14} />
          </button>
          <SignButton onClick={trim}>
            {signing ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPencilAlt color="#fff" size={14} />
            )}
          </SignButton>
        </div>
      </SignContainer>
    </div>
  );
};

export default HandSignatureEditor;
