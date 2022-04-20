import React from "react";
import styled from "styled-components";
import { Image, Grid, Text, IconButton } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { _logoutFX } from "../redux/modules/user";
import { useParams } from "react-router-dom";
import { _getMyProfileFX, _getMyPostFX } from "../redux/modules/mypage";

import MyPost from "./MyPost";

const MyPostList = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.mypage.list);
  const mypost = useSelector((state) => state.mypage.mypost);
  const params = useParams();
  const userId = params.userId;

  console.log(myProfile);
  console.log(mypost);

  React.useEffect(() => {
    dispatch(_getMyProfileFX(userId));
    dispatch(_getMyPostFX(userId));
  }, [userId]);

  // if (myProfile == undefined || mypost == undefined) {
  //   console.log("되라 제발");
  //   return <></>;
  // }

  return (
    <>
      <Grid
        display="flex"
        maxWidth="880px"
        minWidth="500px"
        width="100%"
        height="200px"
        margin="0 auto"
        alignItem="center"
      >
        <Image
          imageType="mypage_profile"
          size="150"
          margin="0px 30px 0 75px"
          src={myProfile.profileImageUrl}
        />
        <Grid
          width="350px"
          display="flex"
          flexDirection="column"
          margin="0 0 0 46px"
        >
          <Grid
            display="flex"
            alignItems="center"
            // padding="10px 5px"
            height="35px"
          >
            <Text size="25px" margin="0" color="#323232">
              {myProfile?.nickname}
            </Text>
            <ProfileBtn>프로필 편집</ProfileBtn>
            <IconButton setting size="20px" color="#323232"></IconButton>
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>게시물 {myProfile?.postCount} </Text>
            <Text>팔로워 {myProfile?.followerCount} </Text>
            <Text>팔로우 {myProfile?.followCount} </Text>
          </Grid>
          <Grid display="flex" alignItems="stretch">
            <Text margin="0">{myProfile?.bio}</Text>
          </Grid>
        </Grid>
      </Grid>

      <Line></Line>
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="300px"
        margin="0 auto"
      >
        <Grid
          is_flex
          margin="auto"
          cursor="pointer"
          width="70px"
          borderTop=" 1px solid #262626"
        >
          <IconButton
            Table
            margin="5px 8px 0 0"
            color="#262626"
            size="15"
          ></IconButton>
          <Span> 게시물</Span>
        </Grid>

        <Grid
          is_flex
          margin="auto"
          cursor="pointer"
          width="70px"
          borderTop=" 1px solid #8E8E8E"
        >
          <IconButton
            bookmark
            margin="5px 8px 0 0"
            color="#8E8E8E"
            size="15"
          ></IconButton>
          <Span style={{ color: "#8E8E8E" }}> 저장됨</Span>
        </Grid>
      </Grid>
      <Grid>
        <MyPost mypost={mypost}></MyPost>
      </Grid>
    </>
  );
};

const ProfileBtn = styled.button`
  height: 30px;
  color: #000;
  background-color: #fff;
  border-radius: 4px;
  width: 100px;
  border: 1px solid #e4e4e4;
  margin: 0 10px;
  font-weight: 800;
`;

const Span = styled.span`
  display: inline-block;
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

const Line = styled.div`
  border-bottom: 1px solid #dbdbdb;
`;

export default MyPostList;
