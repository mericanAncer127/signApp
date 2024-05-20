import { Box, Button, IconButton } from "@mui/material";
import styled from "styled-components";

export const SignButton = styled.button({
  borderRadius: 10,
  height: 40,
  fontSize: 30,
});

export const SignContainer = styled.div`
  position: relative;
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  canvas {
    position: absolute;
    border: 3px solid #eee;
    border-radius: 4px;
    background: white;
    top: -50px;
    width: 300px;
    height: 100px;
    padding: 3px;
  }

  div {
    position: absolute;
    top: 50px;
    left: 10px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    button {
      background: #1a82cc;
      border: 0;
      padding: 15px;
      margin-left: 10px;
      border-radius: 4px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const OptionButton = styled(IconButton)`
  border-right: 3px solid black;
  border-left: 1px solid white;
  width: 25%;
  height: 100%;
`;
export const OptioinSelectorContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  height: 30px;
  background: #0360e9b6;
  color: black;
  border-radius: 10px;
`;
