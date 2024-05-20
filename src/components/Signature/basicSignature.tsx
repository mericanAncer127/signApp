import React, { useState, useEffect, useRef, CSSProperties } from "react";
import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  ResizableProps,
  Resizable,
  Rotatable,
  Draggable,
  Scalable,
} from "react-moveable";

import html2canvas from "html2canvas";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import MoveableHelper from "moveable-helper";
import {
  SignElement,
  TypeSign,
  DateSign,
  CheckSign,
  DrawSign,
  SignResource,
} from "../../types";
import { deleteSign, updateSign } from "../../store/signSlice";
import { useDispatch } from "react-redux";
import DateSignatureEditor from "./Editors/dateSignatureEditor";
import TypeSignatureEditor from "./Editors/typeSignatureEditor";
import HandSignatureEditor from "./Editors/handSignatureEditor";

// In order to use only some able, make a component with makeMoveable function.
const Moveable = makeMoveable<
  DraggableProps & ScalableProps & RotatableProps & ResizableProps
>([Draggable, Scalable, Rotatable, Resizable]);

const Editors: any = {
  TypeSign: TypeSignatureEditor,
  DrawSign: HandSignatureEditor,
  DateSign: DateSignatureEditor,
  CheckSign: null,
};

export interface BasicSignatureProps {
  sign: SignElement;
  selectedElement: SignElement | null;
  handleSelect: (sign: SignElement | null) => void;
}
const BasicSignature: React.FC<BasicSignatureProps> = (props) => {
  const dispatch = useDispatch();
  const { sign, selectedElement, handleSelect } = props;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [style, setStyle] = useState<CSSProperties>();

  const [selected, setSelected] = useState(sign.id === selectedElement?.id);
  const [helper] = useState(() => {
    return new MoveableHelper();
  });
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const Editor: any = Editors[sign.type];

  useEffect(() => {
    setSelected(sign.id === selectedElement?.id);
    setPosition({ x: sign.left, y: sign.top });
    setStyle(sign.style);
  }, [selectedElement]);

  const handleClose = (signId: number) => {
    setSelected(false);
    handleSelect(null);
    dispatch(deleteSign(signId));
  };
  const onChange = async () => {
    // Update the position and size of the object
    const resource: SignResource | undefined = await onRender();

    const rect = targetRef.current?.getBoundingClientRect();
    const crect = containerRef.current?.getBoundingClientRect();
    let x = position.x;
    let y = position.y;
    if (rect && crect) {
      x = rect.left - crect.left;
      y = rect.top - crect.top;
    }

    const UpdatedSign: SignElement = {
      ...sign,
      style: {
        ...sign.style,
        transform: style?.transform,
        // left: `${position.x}px`,
        // top: `${position.y}px`,
      },
      left: x,
      top: y,
      resource: resource,
    };
    dispatch(updateSign(UpdatedSign));
  };

  const onDrag = (e: any) => {
    setStyle(e.style);

    const rect = targetRef.current?.getBoundingClientRect();
    const crect = containerRef.current?.getBoundingClientRect();
    if (rect && crect) {
      setPosition({
        x: rect.left - crect.left,
        y: rect.top - crect.top,
      });
    }

    return helper.onDrag(e);
  };
  const onDragEnd = (e: any) => {
    onChange();
  };
  const onScale = (e: any) => {
    onChange();
    return helper.onScale(e);
  };
  const onRotate = (e: any) => {
    onChange();
    return helper.onRotate(e);
  };

  const onRender = async (): Promise<SignResource | undefined> => {
    if (targetRef.current) {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: null,
      });
      const image = canvas.toDataURL("image/png");

      // const link = document.createElement("a");
      // link.href = image;
      // link.download = "my_image.png"; // Set the desired filename

      // // Trigger a click event on the link to initiate the download
      // link.click();

      const rect = targetRef.current?.getBoundingClientRect();
      const crect = containerRef.current?.getBoundingClientRect();

      if (!rect || !crect) return undefined;
      const resource: SignResource | undefined = {
        image: image,
        x: rect.left - crect?.left,
        y: rect.top - crect?.top,
        w: rect.width,
        h: rect.height,
      };
      return resource;
    }
    return undefined;
  };

  const onChangeContent = async (content: any) => {
    const resource: SignResource | undefined = await onRender();

    const UpdatedSign: SignElement = {
      ...sign,
      style: {
        ...sign.style,
        transform: style?.transform,
        // left: `${position.x}px`,
        // top: `${position.y}px`,
      },
      left: position.x,
      top: position.y,
      content: content,
      resource: resource,
    };

    dispatch(updateSign(UpdatedSign));
    handleSelect(null);
  };

  useEffect(() => {
    if (!Editor) {
      onChangeContent(sign.content);
    }
  }, [Editor]);
  return (
    <div
      // className="target"
      // onMouseOver={(e) => {}}
      style={{ zIndex: 10 }}
      onMouseDownCapture={(e) => {
        // e.preventDefault();
        if (!selectedElement || selectedElement == sign) {
          // Proceed only if there's nothing pre_selected

          handleSelect(sign);
          setSelected(true);
        }
      }}
    >
      <div ref={containerRef}>
        {selected && Editor && (
          <Editor
            sign={sign}
            onChangeContent={onChangeContent}
            style={{
              background: "white",
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y - 100}px`,
            }}
          />
        )}
        <div ref={targetRef} style={{ ...sign.style }}>
          <IconButton
            onClick={() => handleClose(sign.id)}
            style={{
              position: "absolute",
              right: 0,
              top: -30,
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* <IconButton
            onClick={() => handleClose(sign.id)}
            style={{ position: "absolute", right: 30, top: 0 }}
          >
            <EditIcon />
          </IconButton> */}
          {sign.content}
        </div>
      </div>

      <Moveable
        target={targetRef}
        draggable={selected}
        keepRatio={true}
        rotatable={selected}
        resizable={selected}
        scalable={selected}
        onDragStart={helper.onDragStart}
        onScaleStart={helper.onScaleStart}
        onRotateStart={helper.onRotateStart}
        onDrag={onDrag}
        onScale={onScale}
        onDragEnd={onDragEnd}
        onRotate={onRotate}
        throttleScale={0}
      ></Moveable>
    </div>
  );
};

export default BasicSignature;
