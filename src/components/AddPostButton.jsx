import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddBtn from "../assets/icon_add_white.png";

const AddPostButton = () => {
  return (
    <>
      <Link
        to={"/posting"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <StAddBtn>
          <img src={AddBtn} />
        </StAddBtn>
      </Link>
    </>
  );
};

export default AddPostButton;

const StAddBtn = styled.div`
  position: fixed;
  top: 80%;
  right: 5%;
  font-weight: 200;
  font-size: 250%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  color: white;
  background-color: #005eff;
  border-radius: 70%;
`;
