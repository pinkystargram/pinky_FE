import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";
import IconButton from "../elements/IconButton";
import Image from "../elements/Image";
import { useHistory } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentsWrite from "./CommentWrite";
import { Grid } from "../elements";

const Post = (props) => {
  const id=props.postId;
  const history = useHistory();
  const goDetail = () => {
    history.push(`/post/${id}`);
  };
  return (
    <PostContainer>
      <PostHeader>
        <div style={{ width: "90%", display: "flex", alignItems: "center" }}>
          <Image imageType="circle" />
          <Text bold color="#323232" margin="10px">
            {props.nickname}
          </Text>
        </div>
        <IconButton moreView size="16px" color="#323232" />
      </PostHeader>
      <img src={props.imageUrl} style={{ maxWidth:"100%",width:"auto",objectFit:"cover" }} />
      <PostContent width="100%">
        <PostContentHeader>
          <div
            style={{
              width: "100px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton unLikeIcon color="black" />
            <IconButton message color="black" />
            <IconButton airplane color="black" />
          </div>
          <IconButton bookmark />
        </PostContentHeader>
        <PostContentContent>
          <Text bold margin="10px 0px -10px 0px">좋아요 {props.likeCount}개</Text>
          <div style={{display:"flex",alignItems:"center"}}>
            <Text bold margin="2px">{props.nickname}</Text>
            <Text margin="2x">{props.content}</Text>
          </div>
          <Text
            size="14px"
            margin="-10px 0px 0px 0px"
            _onClick={goDetail}
            cursor="pointer"
          >
            댓글 {props.commentCount}개 모두보기
          </Text>
          <Text size="8px">{props.updatedAt}</Text>
        </PostContentContent>
        <Grid>
          <CommentsWrite />
        </Grid>
      </PostContent>
    </PostContainer>
  );
};


const PostContainer = styled.div`
  width: 100%;
  background: white;
  border: 1px solid #e4e4e4;
  margin-bottom: 10px;
`;
const PostHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid#e4e4e4;
  justify-content: space-between;
  padding: 0px 10px;
  box-sizing: border-box;
`;
const PostContent = styled.div`
  width: 100%;
  background: white;
`;
const PostContentHeader = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
const PostContentContent = styled.div`
  margin-top: -15px;
  padding: 0px 10px;
  box-sizing: border-box;
`;

export default Post;
