import React, { CSSProperties, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";

import BasicSignature from "../components/Signature/basicSignature";
import { CheckSign, DateSign, Point, SignElement } from "../types";
import { createSign, deleteSign } from "../store/signSlice";
import SignOptionSelector from "../components/Signature/Editors/signOptionSelector";
import {
  SavePDFButtonContainer,
  SignEditorContainer,
  SignEditorContainerBack,
} from "./styles";
import { IconButton } from "@mui/material";
// import { MoveablePosition } from "react-movable";
interface SignEditorProps {
  entireWidth: number;
  entireHeight: number;
}
const SignEditor: React.FC<SignEditorProps> = (props) => {
  const { entireWidth, entireHeight } = props;

  const dispatch = useDispatch();
  const signElements: SignElement[] = useSelector(
    (state: any) => state.event.signs
  );

  const [selectedElement, setSelectedElement] =
    React.useState<SignElement | null>(null);
  const [toolBarPos, setToolBarPos] = useState<Point>({ x: 0, y: 0 });

  const [openOptionBar, setOpenOptionBar] = useState<boolean>(false);
  const [signType, setSignType] = useState<string>(DateSign);

  const handleOpenOptionBar = () => {
    setOpenOptionBar(true);
  };
  const handleSelectedOption = (signType: string) => {
    setSignType(signType);
    const position: Point = toolBarPos;
    if (!selectedElement) {
      const newStyle: CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y,
        padding: 10,
        textAlign: "center",
        // background: "#ee8",
        color: "#333",
        fontWeight: "bold",
        boxSizing: "border-box",
      };

      let content: any = "";
      if (signType === CheckSign) content = <CheckIcon />;

      const newSign: SignElement = {
        style: newStyle,
        left: position.x,
        top: position.y,
        type: signType,
        content: content,
        id: signElements.length,
        resource: undefined,
        pageIndex: -1,
      };

      dispatch(createSign(newSign));
      setSelectedElement(newSign);
    }
  };

  const handleCreateSign = (position: Point) => {
    if (!selectedElement) {
      setToolBarPos(position);
      handleOpenOptionBar();
    }
  };

  return (
    <>
      <div className="SignHeader"></div>
      <div
        className="sign-editor"
        id="signeditorId"
        onMouseUp={(e: any) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mouseX = e.clientX + window.scrollX - rect.left;
          const mouseY = e.clientY + window.scrollY;

          // const mouseX = e.clientX + window.scrollX;
          // const mouseY = e.clientY + window.scrollY;
          handleCreateSign({
            x: mouseX,
            y: mouseY,
          });
        }}
        style={{
          position: "absolute",
          zIndex: 2,
          minHeight: 10,
          minWidth: 10,
          width: entireWidth,
          height: entireHeight,
        }}
      >
        {selectedElement && (
          <div
            id="signeditorBackID"
            style={{
              position: "absolute",
              left: 0,
              top: 50,
              margin: 10,
              opacity: 0,
              background: "green",
              width: "100%",
              height: "100%",
            }}
            onClick={() => {
              setSelectedElement(null);
            }}
          />
        )}
        {signElements &&
          signElements.map((sign: SignElement) => (
            <BasicSignature
              key={`${sign.content}-${sign.id}`}
              sign={sign}
              selectedElement={selectedElement}
              handleSelect={(sign: SignElement | null) =>
                setSelectedElement(sign)
              }
            />
          ))}
        <SignOptionSelector
          entireHeight={entireHeight}
          position={toolBarPos}
          open={openOptionBar}
          handleClose={() => setOpenOptionBar(false)}
          handleSelectedOption={handleSelectedOption}
        />
      </div>
    </>
  );
};

export default SignEditor;
