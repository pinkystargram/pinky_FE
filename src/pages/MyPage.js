import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {} from "react-icons";
import { Text, IconButton, Image, Grid } from "../elements";
import MyPostList from "../components/MyPostList";

const MyPage = () => {
  return (
    <>
      <Wrap>
        <MyPostList />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  /* background-color: #fafafa; */
  padding-top: 100px;
`;

export default MyPage;
