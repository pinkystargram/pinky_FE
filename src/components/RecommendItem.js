import React from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Text from "../elements/Text";
import { useDispatch, useSelector } from "react-redux";
import { _FollowingUserFX } from "../redux/modules/user";
import { history } from "../redux/configStore";

const RecommendItem = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  const following = (userId) => {
    dispatch(_FollowingUserFX(userId));
  };

  const goMypage = (userId) => {
    history.push(`/MyPage/${userId}`);
  };

  return (
    <React.Fragment>
      <RecommendBox>
        <div style={{ width: "86%", display: "flex" }}>
          <Image
            src={props.profileImageUrl}
            imageType="circle"
            margin="0px 10px 0px 0px"
          />
          <Text
            bold
            size="12px"
            _onClick={() => {
              goMypage(props.userId);
            }}
            cursor="pointer"
          >
            {props.nickname}
          </Text>
        </div>
        {props.following_edit ? (
          <Text
            _onClick={() => {
              following(props.userId);
            }}
            color="rgb(231, 38, 116)"
            size="12px"
            bold
            cursor="pointer"
          >
            팔로우
          </Text>
        ) : (
          <Text
            _onClick={() => {
              following(props.userId);
            }}
            color="rgb(231, 38, 116)"
            size="12px"
            bold
            cursor="pointer"
          >
            팔로잉
          </Text>
        )}
      </RecommendBox>
    </React.Fragment>
  );
};

RecommendItem.defaultProps = {
  userId: "userId@naver.com",
  nickname: "nickname",
  profileImageUrl: "https://www.snsboom.co.kr/common/img/default_profile.png",
};

const RecommendBox = styled.div`
  width: 300px;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
export default RecommendItem;
