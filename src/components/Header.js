import React from "react";
import styled from "styled-components";
import { IconButton, Text, Grid } from "../elements/index";
import Image from "../elements/Image";
import logo from "../assets/logo.png";
import { useHistory } from "react-router-dom";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { _logoutFX } from "../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const [dropmenu, setDropmenu] = React.useState(false);
  const user_info = useSelector((state) => state.user.user);
  console.log(user_info);

  const dropToggle = () => {
    return setDropmenu(!dropmenu);
  };

  const logOut = () => {
    dropToggle();
    dispatch(_logoutFX());
  };

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

  const goMypage = (userId) => {
    dropToggle();
    history.push(`/MyPage/${userId}`);
  };

  const isLogin = useSelector((state) => state.user.is_login);

  if (user_info.userId == undefined) {
    console.log("제발 오류 ㄴㄴ");
    return <></>;
  }

  if (isLogin) {
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
            <Image
              cursor="pointer"
              imageType="circle"
              color="black"
              _onClick={dropToggle}
            />
            {dropmenu ? (
              <DropContent>
                <p onClick={logOut} style={{ cursor: "pointer" }}>
                  로그아웃
                </p>
                <hr />
                <p onClick={goMypage} style={{ cursor: "pointer" }}>
                  프로필
                </p>
              </DropContent>
            ) : (
              ""
            )}
          </IConBtns>
        </HeaderWrapper>
      </HeaderWrap>
    );
  }

  return <></>;
};

const DropContent = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  background-color: white;
  min-width: 160px;
  z-index: 1;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

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
  width: 300px;
  // background:red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export default Header;
