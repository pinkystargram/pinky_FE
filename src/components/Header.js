import React from "react";
import styled from "styled-components";
import { IconButton } from "../elements/index";
import Image from "../elements/Image";
import logo from "../assets/logo.png";
import { useHistory } from "react-router-dom";
import MediaQuery, { useMediaQuery } from "react-responsive";

const Header = () => {
  const isPc = useMediaQuery({
    query: "(min-width : 1000px) and (max-width :1920px)",
  });
  const history = useHistory();
  const goMain = () => {
    history.push("/");
  };

  const goWrite = () => {
    history.push("/ImagePost");
  };

  const goMypage = () => {
    history.push("/MyPage");
  };

  if (window.location.pathname === "/signup") return null;
  if (window.location.pathname === "/login") return null;

  return (
    <HeaderWrap>
      <HeaderWrapper>
        <img src={logo} onClick={goMain} style={{ cursor: "pointer" }} />
        {isPc ? <SearchBar /> : null}
        <IConBtns>
          <IconButton home color="black" _onClick={goMain} />
          <IconButton airplane color="black" />
          <IconButton plusIcon _onClick={goWrite} color="black" />
          <IconButton compass color="black" />
          <IconButton unLikeIcon color="black" />
          <Image imageType="circle" color="black" _onClick={goMypage} />
        </IConBtns>
      </HeaderWrapper>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  width: 100%;
  height: 50px;
  background: white;
  border-bottom: 1px solid #e4e4e4;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;
const SearchBar = styled.input`
  type: text;
  border: none;
  background: grey;
  border-radius: 5px;
  height: 23px;
  width: 250px;
  background: #e4e4e4;
`;

const HeaderWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const IConBtns = styled.div`
  display: flex;
  width: 300px;
  // background:red;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
