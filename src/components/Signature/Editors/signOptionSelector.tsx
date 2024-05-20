import React from "react";
import { OptioinSelectorContainer, OptionButton } from "./style";
import DrawIcon from "@mui/icons-material/Draw";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { CheckSign, DateSign, DrawSign, Point, TypeSign } from "../../../types";

interface SignOptionSelectorProps {
  entireHeight: number;
  position: Point;
  open: boolean;
  handleClose: () => void;
  handleSelectedOption: (signType: string) => void;
}

const SignOptionSelector: React.FC<SignOptionSelectorProps> = (props) => {
  const { position, handleSelectedOption, open, handleClose, entireHeight } =
    props;
  const onOptionSelect = (signType: string) => {
    handleSelectedOption(signType);
    handleClose();
  };
  return (
    <>
      {open && (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: entireHeight,
              background: "blue",
              opacity: 0,
            }}
            onClick={handleClose}
          ></div>
          <OptioinSelectorContainer
            style={{ left: position.x - 100, top: position.y - 40 }}
          >
            <OptionButton onClick={() => onOptionSelect(DrawSign)}>
              <DrawIcon />
            </OptionButton>
            <OptionButton onClick={() => onOptionSelect(TypeSign)}>
              <TextFieldsIcon />
            </OptionButton>
            <OptionButton onClick={() => onOptionSelect(CheckSign)}>
              <CheckBoxIcon />
            </OptionButton>
            <OptionButton onClick={() => onOptionSelect(DateSign)}>
              <CalendarTodayIcon />
            </OptionButton>
          </OptioinSelectorContainer>
        </>
      )}
    </>
  );
};

export default SignOptionSelector;
