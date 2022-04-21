import React, { useState } from "react";
import styled from "styled-components";

import { Grid, IconButton, Image, Input, Text } from "../elements";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";

import {
  _editProfileFX,
  _getFollowingFX,
  _getMyProfileFX,
} from "../redux/modules/mypage";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";

const ProfileEdit = (props) => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.mypage.list);
  const params = useParams();
  const userId = params.userId;

  console.log(myProfile);
  console.log(userId);

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [imgFile, setImgFile] = useState(null);

  console.log(nickname, bio, imgFile);
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  console.log(imgBase64);

  const goBack = () => {
    history.push(`/MyPage/${userId}`);
  };

  const updateProfile = () => {
    dispatch(_editProfileFX(nickname, imgFile, bio, userId));
  };

  const handleChangeFile = (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]);
    }
  };

  React.useEffect(() => {
    dispatch(_getMyProfileFX(userId));
  }, []);

  return (
    <DetailWrapper>
      <ModalBg onClick={goBack} />
      <DetailModal>
        <Grid
          overflow="auto"
          display="flex"
          flexDirection="column"
          margin="5px 20px"
        >
          <ProfileLabel for="profile_image">프로필 사진</ProfileLabel>

          <ProfileInput
            type="file"
            id="profile_image"
            onChange={handleChangeFile}
          ></ProfileInput>

          <Image
            imageType="mypage_profile"
            size="150"
            margin="20px auto"
            src={
              imgBase64
                ? imgBase64
                : "https://www.snsboom.co.kr/common/img/default_profile.png"
            }
          />
          <Text margin="15px 0 4px 0" bold color="#e72674" size="13px">
            사용자이름
          </Text>
          <EditInput
            type="text"
            defaultValue={myProfile?.nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          ></EditInput>
          <Text margin="15px 0 4px 0" bold color="#e72674" size="13px">
            자기 소개
          </Text>
          <EditInput
            type="text"
            defaultValue={myProfile?.bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          ></EditInput>
          <EditBtn onClick={updateProfile}>수정 완료</EditBtn>
        </Grid>
      </DetailModal>

      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "10",
        }}
      >
        <IconButton cancle color="white" _onClick={goBack} />
      </div>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  width: 100%;
`;
const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
`;
const DetailModal = styled.div`
  max-width: 400px;
  width: 100%;
  background: white;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 5;
  border-radius: 20px;
`;

const EditInput = styled.input`
  border: 1px solid #e4e4e4;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const EditBtn = styled.button`
  border: none;
  width: 100%;
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

const ProfileLabel = styled.label`
  box-sizing: border-box;
  font-size: 13px;
  font-weight: 600;
  height: 33px;
  width: 100px;
  text-align: center;
  line-height: 33px;
  border: none;
  color: white;
  vertical-align: middle;
  background-color: rgba(50, 81, 119, 1);
  cursor: pointer;
  border-radius: 5px;
  margin: 10px auto;
`;

const ProfileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export default ProfileEdit;
