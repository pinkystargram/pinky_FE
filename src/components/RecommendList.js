import { useEffect } from "react";
import styled from "styled-components";
import RecommendItem from "../components/RecommendItem";
import { useDispatch, useSelector } from "react-redux";
import { Text, Grid, Image } from "../elements/index";
import { _getRecommendFX } from "../redux/modules/user";
import Footer from "./Footer";

const RecommendList = () => {
  const dispatch = useDispatch();

  const recommend = useSelector((state) => state.user);
  console.log(recommend);

  useEffect(() => {
    console.log("팔로우 추천 시작");
    dispatch(_getRecommendFX());
  }, []);

  if (recommend.recommend.length == null) {
    console.log("제발 오류 ㄴㄴ");
    return <></>;
  }

  return (
    <>
      <MyProfile>
        <div>
          <Image
            src={recommend.user.profileImageUrl}
            imageType="circle"
            size="50"
          />
        </div>
        <Grid is_flex>
          <Grid margin="-20px 0px 0px 0px" padding="0px 10px">
            <Text bold color="#2a2a2a" size="14px">
              {recommend.user.nickname}
            </Text>
            <Text bold color="#949494" size="14px" margin="-14px 0px 0px 0px">
              {/* {recommend.user.nickname} */}
            </Text>
          </Grid>
          <Grid width="40px" margin="0px -10px 0px 0px">
            <Text color="rgb(231, 38, 116)" size="12px" bold>
              전환
            </Text>
          </Grid>
        </Grid>
      </MyProfile>
      <RecommendHeader>
        <Text bold size="14px">
          회원님을 위한 추천
        </Text>
        <Text bold size="8px">
          모두 보기
        </Text>
      </RecommendHeader>
      <Grid margin="5px 20px">
        {recommend.recommend.map((recommend, idx) => {
          return <RecommendItem key={idx} {...recommend} />;
        })}
        <Footer />
      </Grid>
    </>
  );
};

RecommendList.defaultProps = {
  userId: "userId@naver.com",
  nickname: "nickname",
  profileImageUrl: "https://www.snsboom.co.kr/common/img/default_profile.png",
};

const MyProfile = styled.div`
  width: 300px;
  padding: 10px 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
`;

const RecommendHeader = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  box-sizing: border-box;
  align-items: center;
  margin-left: 20px;
`;

export default RecommendList;
