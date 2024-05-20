import React, { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";

import { SignElement } from "../../../types";

interface TypeSignatureEditorProps {
  sign: SignElement;
  style: CSSProperties | undefined;
  onChangeContent: (content: any) => void;
}

const StyledInput = styled.input({
  borderRadius: 10,
  height: 30,
  fontSize: 25,
  padding: 5,
  paddingLeft: 20,
});
const Button = styled.button({
  borderRadius: 10,
  height: 40,
  fontSize: 30,
});
const TypeSignatureEditor: React.FC<TypeSignatureEditorProps> = (props) => {
  const { style, onChangeContent, sign } = props;
  const [value, setValue] = useState<
    string | number | readonly string[] | undefined
  >("");
  useEffect(() => {
    setValue("");
    setValue(sign.content);
  }, []);

  const handleStartDateTimeChange = () => {
    const newContent = value;
    onChangeContent(newContent);
  };
  return (
    <div style={style}>
      <StyledInput
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />

      <IconButton
        onClick={handleStartDateTimeChange}
        style={{
          position: "absolute",
          right: 10,
          top: 0,
          height: 40,
        }}
      >
        <SaveIcon />
      </IconButton>
    </div>
  );
};

export default TypeSignatureEditor;
