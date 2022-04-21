import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {} from "react-icons";
import { Text, IconButton, Image } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { _loginFX, _loginCheckFX, kakaoLogin } from "../redux/modules/user";
import { emailCheck } from "../shared/Common";
import Logo from "../assets/logo.png";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector((state) => state.user.is_login);

  //상태관리
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    if (email === "") {
      alert("이메일를 입력해주세요.");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!emailCheck(email)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }
    dispatch(_loginFX(email, password));
  };

  useEffect(() => {
    if (isLogin) history.push("/");
  }, []);

  return (
    <React.Fragment>
      <LoginGrid>
        <Image
          imageType="logo"
          width="150px"
          height="39px"
          bgsize="contain"
          margin="20px auto"
          src={Logo}
        />
        <Grid>
          <LoginInput
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onSubmit={() => {}}
            placeholder="전화번호, 사용자 이름은 안됨. 오직 이메일"
          ></LoginInput>
          <LoginInput
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onSubmit={() => {}}
            placeholder="비밀번호"
          ></LoginInput>
          <LoginBtn onClick={login}>로그인</LoginBtn>
          <LineGrid>
            <Line />
            <Text size="13px" margin="0 18px" color="#8e8e8e" bold>
              또는
            </Text>
            <Line />
          </LineGrid>
          <FacebookGrid
            onClick={() => {
              dispatch(kakaoLogin());
            }}
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99429 0C3.56888 0 0 2.89573 0 6.41119C0 8.69305 1.48465 10.6911 3.71164 11.8321L2.95789 14.6873C2.94368 14.7301 2.94149 14.776 2.95158 14.82C2.96166 14.864 2.98362 14.9043 3.01499 14.9363C3.06073 14.9772 3.11959 14.9999 3.18059 15C3.23116 14.9959 3.27914 14.9756 3.31763 14.9421L6.56103 12.724C7.03979 12.791 7.52241 12.8258 8.00571 12.8282C12.4254 12.8282 16 9.93244 16 6.41119C16 2.88994 12.414 0 7.99429 0Z"
                fill="#392020"
              />
            </svg>

            <Span> 카카오톡으로 로그인 </Span>
          </FacebookGrid>
          <Grid>
            <Atag>비밀번호를 잊으셨나요?</Atag>
          </Grid>
        </Grid>
      </LoginGrid>

      <SignupWrapGrid>
        <SignupGrid>
          <Text margin="15px 0 15px auto" size="14px">
            계정이 없으신가요?
          </Text>
          <Text
            margin="15px auto 15px 5px"
            size="14px"
            color="#e72674"
            cursor="pointer"
            bold
            _onClick={() => {
              history.push("/signup");
            }}
          >
            가입하기
          </Text>
        </SignupGrid>
      </SignupWrapGrid>

      <AppTextGrid>
        <Text margin="20px auto 10px auto" textalign="center" size="14px">
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
      {/* 
      <LoginBtn
        onClick={() => {
          console.log("R토큰 test");
          dispatch(_loginCheckFX());
        }}
      >
        토큰 테스트
      </LoginBtn> */}
    </React.Fragment>
  );
};

const LoginGrid = styled.div`
  max-width: 350px;
  width: 100%;
  border: 1px solid #e4e4e4;
  background-color: #fff;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
  margin: 150px auto 0 auto;
`;

const LoginInput = styled.input`
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

const LoginBtn = styled.div`
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

const FacebookGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  cursor: pointer;
  background-color: #fae301;
  width: 300px;
  height: 33px;
  line-height: 23px;
  padding: 5px 0;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const Span = styled.span`
  display: inline-block;
  margin: 0 0 0 5px;
  font-size: 14px;
  color: #391b1b;
  font-weight: bold;
`;

const Atag = styled.a`
  margin: 0 auto 10px auto;
  font-size: 12px;
  display: block;
  text-align: center;
`;

const SignupWrapGrid = styled.div`
  display: flex;
  max-width: 350px;
  width: 100%;
  height: 65px;
  border: 1px solid #e4e4e4;
  margin: 10px auto 0 auto;
`;

const SignupGrid = styled.div`
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

export default Login;
