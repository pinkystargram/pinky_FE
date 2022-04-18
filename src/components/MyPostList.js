import React from "react";
import styled from "styled-components";
import { Image, Grid, Text, IconButton } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { _logoutFX } from "../redux/modules/user";

import MyPost from "./MyPost";

const MyInfo = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid
        display="flex"
        maxWidth="800px"
        minWidth="550px"
        width="100%"
        height="200px"
        margin="0 auto"
        justifyContent="center"
        alignItem="center"
      >
        <Image
          imageType="mypage_profile"
          size="150"
          margin="0px 30px"
          src="https://file.mk.co.kr/meet/neds/2020/03/image_readtop_2020_226503_15832856704110300.jpg"
        />
        <Grid width="350px" display="flex" flexDirection="column">
          <Grid
            display="flex"
            alignItems="center"
            padding="10px 5px"
            height="35px"
          >
            <Text size="25px" margin="0" color="#323232">
              u_display
            </Text>
            <ProfileBtn>프로필 편집</ProfileBtn>
            <IconButton setting size="20px" color="#323232"></IconButton>
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>게시물 345</Text>
            <Text>팔로워 1,092</Text>
            <Text>팔로우 774</Text>
          </Grid>
          <Grid display="flex" alignItems="stretch">
            <Text margin="0">핑키스타그램을 위한 나만의 페이지</Text>
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
        <MyPost></MyPost>
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

export default MyInfo;
