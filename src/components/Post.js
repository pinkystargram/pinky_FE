import React from "react";
import styled from "styled-components";
import { Text, IconButton, Image, Grid } from "../elements/index";
import { useHistory } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentsWrite from "./CommentWrite";
import { useDispatch, useSelector } from "react-redux";

const Post = (props) => {
  const dispatch = useDispatch();
  const likeState = props.likeState;
  const bookmarkState = props.bookmarkState;
  const [isOpen, setMenu] = React.useState(false);
  const id = props.postId;
  const history = useHistory();
  const goDetail = () => {
    history.push(`/post/${id}`);
  };

  const modalUp = () => {
    setMenu(true);
  };
  const modalDown = () => {
    setMenu(false);
  };
  const like = () => {
    if (likeState == false) {
      dispatch(postActions.addLikeDB(id));
    } else {
      dispatch(postActions.minusLikeDB(id));
    }
  };
  const bookmark = () => {
    if (bookmarkState == false) {
      dispatch(postActions.addBookmarkDB(id));
    } else {
      dispatch(postActions.cancleBookmarkDB(id));
    }
  };

  const deletePost = () => {
    dispatch(postActions.deletePostDB(id));
  };

  const editPost = () => {
    history.push(`/edit/${id}`);
  };

  const goMypage = (userId) => {
    history.push(`/MyPage/${userId}`);
  };

  return (
    <PostContainer>
      {isOpen && (
        <ModalBg onClick={modalDown}>
          <div style={{ position: "fixed", top: "20px", right: "20px" }}>
            <IconButton
              cancle
              _onClick={modalDown}
              zIndex="100"
              color="white"
            />
          </div>
        </ModalBg>
      )}
      {isOpen && (
        <DetailModal>
          <Text cursor="pointer" _onClick={deletePost}>
            삭제하기
          </Text>
          <hr />
          <Text cursor="pointer" _onClick={editPost}>
            수정하기
          </Text>
        </DetailModal>
      )}
      <PostHeader>
        <div style={{ width: "90%", display: "flex", alignItems: "center" }}>
          <Image imageType="circle" />
          <Text
            bold
            color="#323232"
            margin="10px"
            _onClick={() => {
              console.log(props.userId);
              goMypage(props.userId);
            }}
            cursor="pointer"
          >
            {props.nickname}
          </Text>
        </div>
        <IconButton moreView size="16px" color="#323232" _onClick={modalUp} />
      </PostHeader>
      <img
        src={props.imageUrl}
        style={{ maxWidth: "100%", width: "auto", objectFit: "cover" }}
      />
      <PostContent width="100%">
        <PostContentHeader>
          <div
            style={{
              width: "100px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {likeState ? (
              <IconButton likeIcon color="pink" _onClick={like} />
            ) : (
              <IconButton unLikeIcon color="black" _onClick={like} />
            )}
            <IconButton message color="black" />
            <IconButton airplane color="black" />
          </div>
          {bookmarkState ? (
            <IconButton bookmarkFill color="black" _onClick={bookmark} />
          ) : (
            <IconButton bookmark _onClick={bookmark} color="black" />
          )}
        </PostContentHeader>
        <PostContentContent>
          <Text bold margin="10px 0px -10px 0px">
            좋아요 {props.likeCount}개
          </Text>
          <Text>
            <span style={{ fontWeight: "bold", marginRight: "5px" }}>
              {props.nickname}
            </span>
            {props.content}
          </Text>
          <Text
            size="14px"
            margin="-10px 0px 0px 0px"
            _onClick={goDetail}
            cursor="pointer"
          >
            댓글 {props.commentCount}개 모두보기
          </Text>
          <Text size="8px">{props.createdAt}</Text>
        </PostContentContent>
        <Grid>
          <CommentsWrite id={id} />
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
  border-bottom: 1px solid #e4e4e4;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  width: 300px;
  background: white;
  height: 200px;
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 5;
`;

export default Post;
