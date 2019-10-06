import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-direction: column;
`;

const Message = styled.span`
  margin: 1em;
`;

const Loader = ({
  message = "Loading. Please wait...",
  messageVisible = true
}) => {
  return (
    <Overlay>
      <CircularProgress color="inherit" />
      {messageVisible && <Message>{message}</Message>}
    </Overlay>
  );
};

export default Loader;
