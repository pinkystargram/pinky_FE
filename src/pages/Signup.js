import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {} from "react-icons";
import { Text, IconButton, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { emailCheck } from "../shared/Common";

import { _signUpFX } from "../redux/modules/user";

import Logo from "../assets/logo.png";

const Signup = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.is_login);

  // 상태관리
  const [email, setEmail] = React.useState("");
  const [nickName, setNickName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signup = () => {
    if (email === "" || password === "" || nickName === "") {
      alert("입력사항을 전부 기입해주세요");
      return;
    }
    if (!emailCheck(email)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    dispatch(_signUpFX(email, nickName, password));
  };

  useEffect(() => {
    if (isLogin) history.push("/");
  });

  return (
    <React.Fragment>
      <SignupGrid>
        <Image
          imageType="logo"
          width="150px"
          height="39px"
          bgsize="contain"
          margin="20px auto"
          src={Logo}
        />
        <Text
          weight="900"
          color="#8E8E8E"
          align="center"
          size="17px"
          width="268px"
          margin="auto"
          textalign
          bold
        >
          친구들의 사진과 동영상을 보려면 가입하세요.
        </Text>

        <Grid>
          <SignupBtn
            _onClick={() => {
              console.log("facebook 로그인");
            }}
          >
            <FacebookGrid
              onClick={() => {
                console.log("페북로그인");
              }}
            >
              <IconButton
                facebookLogo
                margin="0 8px 0 0"
                color="#FFFFFF"
              ></IconButton>
              Facebook으로 로그인
            </FacebookGrid>
          </SignupBtn>

          <LineGrid>
            <Line />
            <Text size="13px" margin="0 18px" color="#8e8e8e" bold>
              또는
            </Text>
            <Line />
          </LineGrid>
          <FormGrid
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <SignupInput
              onSubmit={() => {}}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="이메일"
            ></SignupInput>

            <SignupInput
              onSubmit={() => {}}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
              placeholder="사용자 이름"
            ></SignupInput>

            <SignupInput
              onSubmit={() => {}}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호"
            ></SignupInput>
            <SignupBtn
              onClick={signup}
              padding="5px 0px"
              margin="10px auto 5px auto"
              borderRadius="5px"
              fontWeight="bold"
            >
              가입
            </SignupBtn>
          </FormGrid>
        </Grid>
      </SignupGrid>

      <LoginWrapGrid>
        <LoginGrid>
          <Text margin="15px 0 15px auto" size="14px">
            계정이 있으신가요?
          </Text>
          <Text
            margin="15px auto 15px 5px"
            size="14px"
            color="#e72674"
            cursor="pointer"
            bold
            _onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Text>
        </LoginGrid>
      </LoginWrapGrid>

      <AppTextGrid>
        <Text margin="20px auto 10px auto" textalign size="14px">
          앱을 다운로드하세요.
        </Text>
      </AppTextGrid>
      <AppDownGrid>
        <Image
          cursor="pointer"
          _onClick={() => {
            window.open(
              "https://apps.apple.com/app/instagram/id389801252?vt=lo",
              "_blank"
            );
          }}
          imageType="logo"
          width="136px"
          height="40px"
          bgsize="cover"
          margin="10px 4px 20px auto"
          src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_korean-ko.png/4a5c9d62d51b.png"
        ></Image>
        <Image
          cursor="pointer"
          _onClick={() => {
            window.open(
              "https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=B9E69747-84D6-4E2F-9807-E91F7C5FB1F0&utm_content=lo&utm_medium=badge",
              "_blank"
            );
          }}
          imageType="logo"
          width="136px"
          height="40px"
          bgsize="cover"
          margin="10px auto 20px 4px"
          src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_korean-ko.png/f155b664a93b.png"
        ></Image>
      </AppDownGrid>
    </React.Fragment>
  );
};

const SignupGrid = styled.div`
  max-width: 350px;
  width: 100%;
  border: 1px solid #e4e4e4;
  background-color: #fff;
  padding: 10px 0 30px 0;
  display: flex;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
  margin: 150px auto 0 auto;
`;

const FormGrid = styled.form`
  max-width: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

const SignupInput = styled.input`
  background-color: #fafafa;
  padding: 9px 0 7px 8px;
  margin: 3px auto;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  height: 35px;
  width: 300px;
  box-sizing: border-box;
  :focus {
    outline: 1px solid #864e9b;
  }
`;

const SignupBtn = styled.div`
  width: 300px;
  height: 33px;
  line-height: 23px;
  padding: 5px 0;
  margin: 15px auto 5px auto;
  border-radius: 5px;
  background: linear-gradient(
    30deg,
    rgba(231, 38, 116, 1) 0%,
    rgba(187, 61, 146, 1) 21%,
    rgba(134, 78, 155, 1) 58%,
    rgba(50, 81, 119, 1) 97%
  );
  color: white;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  box-sizing: border-box;
  cursor: pointer;
`;

const FacebookGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LineGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
`;

const Line = styled.div`
  border-bottom: 1px solid #dbdbdb;
  width: 103px;
`;

const LoginWrapGrid = styled.div`
  display: flex;
  max-width: 350px;
  width: 100%;
  height: 65px;
  border: 1px solid #e4e4e4;
  margin: 10px auto 0 auto;
`;

const LoginGrid = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  margin: 0 auto;
`;

const AppTextGrid = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
`;

const AppDownGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 0 auto;
  max-width: 350px;
  width: 100%;
`;

const Grid = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 350px;
  width: 100%;
`;

export default Signup;
