import React from "react";
import { FaSpinner } from "react-icons/fa";
import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    input {
      flex: 1;
      border: 3px solid #eee;
      margin-left: 10%;
      padding: 10px 15px;
      border-radius: 4px;
      font-size: 16px;
    }
  }
`;

export const SignContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  canvas {
    border: 3px solid #eee;
    border-radius: 4px;
    background: white;
    width: 100%;
    height: 100%;
    padding: 3px;
  }

  div {
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

export const PdfContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  iframe {
    border: 3px solid #eee;
    border-radius: 4px;
    background: white;
    width: 100%;
    height: 100%;
    min-height: 500px;
    padding: 3px;
  }
`;

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `;

// interface SignButtonProps{
//   type : string,
//   disabled : boolean,
// }

// export const SignButton = styled.button.attrs(props => ({
//   type: 'button',
//   disabled: props.loading,
// }))`
//   &[disabled] {
//     cursor: not-allowed;
//     opacity: 0.6;
//   }

//   ${props =>
//     props.loading &&
//     css`
//       svg {
//         animation: ${rotate} 2s linear infinite;
//       }
//     `}
// `;

interface SignButtonProps {
  loading: boolean | undefined | null;
  onClick: (e: any) => void;
  disabled: boolean;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const StyledSignButton = styled.button<SignButtonProps>`
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const SignButton: React.FC<SignButtonProps> = (props) => {
  // Filter out the 'loading' prop before spreading the rest
  const { loading } = props;

  return (
    <StyledSignButton {...props}>
      {loading ? <FaSpinner color="#fff" size={14} /> : props.children}
    </StyledSignButton>
  );
};

export const SignEditorContainer = styled.div`
  position: aboslute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
export const SignEditorContainerBack = styled.div`
  position: "absolute";
  left: 0;
  top: 0;
  opacity: 0.4;
  background: green;
  width: 500px;
  height: 500px;
`;

export const SavePDFButtonContainer = styled.div`
  position: "sticky";
  z-index: 100;
  right: 100;
  top: 100;
`;
