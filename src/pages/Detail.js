import React from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Text from "../elements/Text";
import { Grid } from "../elements";
import IconButton from "../elements/IconButton";
import CommentList from "../components/CommentList";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CommentWrite from "../components/CommentWrite";
import { actionCreators as postActions } from "../redux/modules/post";

const Detail = (props) => {
  const id = props.match.params.id;
  React.useEffect(() => {
    dispatch(postActions.getPostOneDB(id));
  }, []);
  const targetPostOne = useSelector((state) =>
    state.post.target ? state.post.target : null
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const postlist = useSelector((state) => state.post.post);

  console.log(targetPostOne);
  const targetPost = postlist.find((p) => p.postId === id);
  const goBack = () => {
    history.push("/");
  };
  console.log(targetPostOne);
  if (targetPostOne.length == 0) {
    console.log("되라 제발");
    return <></>;
  }
  // const post_idx=post_list.findIndex(p=>p.id===id);
  return (
    <DetailWrapper>
      <ModalBg onClick={goBack} />
      <DetailModal>
        <ImageDiv>
          <ImageContent src={targetPostOne.data.imageUrl} />
        </ImageDiv>
        <ContentDiv>
          <PostHeader>
            <Grid display="flex" ju margin="10px 0" alignItems="center">
              <Image
                src={targetPostOne.data.commentList.profileImageUrl}
                imageType="circle"
                size="35"
                margin="5px 15px 5px 5px"
              />
              <Text
                bold
                color="#4B4B4B"
                margin="5px 5px"
                size="14px"
                display="inline"
                width="370px"
              >
                <span style={{ margin: "0 5px 0 0" }}>
                  {targetPostOne.data.nickname}
                </span>
              </Text>
            </Grid>
            <IconButton moreView size="16px" color="#323232" />
          </PostHeader>
          <CommentListWrapper>
            <CommentList
              image={targetPostOne.data.commentList.profileImageUrl}
            />
          </CommentListWrapper>
          <PostContentContent>
            <Text bold>좋아요 {targetPostOne.data.likeCount}개</Text>
            <Text size="14px" margin="-10px 0px 0px 0px">
              댓글{targetPostOne.data.commentList.length}개 모두보기
            </Text>
            <Text size="8px">{targetPostOne.data.createdAt}</Text>
            <Grid width="100%">
              <CommentWrite id={targetPostOne.data.postId} />
            </Grid>
          </PostContentContent>
        </ContentDiv>
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
  max-width: 1000px;
  width: 1000px;
  background: white;
  height: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 5;
`;
const ImageDiv = styled.div`
  width: 50%;
  height: 600px;
  background: black;
  z-index: 4;
  overflow: hidden;
  line-height: 600px;
`;

const ContentDiv = styled.div`
  width: 50%;
  height: 600px;
  background: white;
  z-index: 4;
  float: left;
`;
const ImageContent = styled.img`
  width: 100%;
  height: auto;
  vertical-align: middle;
`;
const CommentListWrapper = styled.div`
  height: 600px;
  overflow-y: scroll;
`;
const PostHeader = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  justify-content: space-between;
  padding: 0px 10px;
  box-sizing: border-box;
  position: fixed;
  background: white;
`;

const PostContentContent = styled.div`
  width: 50%;
  margin-top: -15px;
  padding: 0px 10px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  right: 100;
  background: white;
  border-top: 1px solid #d3d3d3;
`;

export default Detail;
