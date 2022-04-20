import React from "react";
import styled from "styled-components";
import { Grid, IconButton, Text, Image } from "../elements";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../redux/configStore";
import { _getFollowerFX } from "../redux/modules/mypage";

import RecommendItem from "../components/RecommendItem";

const Follower = (props) => {
  const userId = props.match.params.userId;
  const dispatch = useDispatch();

  const follower = useSelector((state) => state.mypage.follower);
  console.log(follower);

  const goBack = () => {
    history.push(`/MyPage/${userId}`);
  };

  React.useEffect(() => {
    dispatch(_getFollowerFX(userId));
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
          {follower?.map((follower, idx) => {
            return <RecommendItem key={idx} {...follower} />;
          })}
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

// const ContentDiv = styled.div`
//   width: 300px;
//   height: 600px;
//   background: white;
//   z-index: 4;
//   float: left;
// `;

export default Follower;
