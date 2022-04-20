import React from "react";
import styled from "styled-components";

import { Grid, IconButton, Image, Text } from "../elements";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";

import { _getFollowingFX } from "../redux/modules/mypage";

import RecommendItem from "../components/RecommendItem";

const Following = (props) => {
  const userId = props.match.params.userId;
  const dispatch = useDispatch();

  const following = useSelector((state) => state.mypage.following);
  console.log(following);

  const goBack = () => {
    history.push(`/MyPage/${userId}`);
  };

  React.useEffect(() => {
    dispatch(_getFollowingFX(userId));
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
          {following?.map((following, idx) => {
            return <RecommendItem key={idx} {...following} />;
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

export default Following;
