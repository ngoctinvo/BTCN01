import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button((props) => ({
  color: props.value === 'X' ? "red" : "green",
  fontFamily: "cursive",
  background: "white",
  border: "3px solid #ac466f",
  float: "left",
  fontSize: "48px",
  fontWeight: "bold",
  lineHeight: "64px",
  height: "64px",
  borderRadius: "5px",
  // marginRight: "-1px",
  // marginTop: "-1px",
  padding: "0",
  textAlign: "center",
  width: "64px",
  "&:hover": { cursor: "pointer" , background: "pink" },

  "&:focus": { outline: "none", background: "pink" },
}));

const activeClass = css({
  backgroundColor: "pink",
  border: "2px solid palevioletred",
});

const Square = ({ value, onClick, isActive }) => {
  return (
    <Button onClick={onClick} value={value} className={isActive? activeClass : null}>
      {value}
    </Button>
  );
};
export default Square;
