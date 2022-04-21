import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Grid, Image, Text, IconButton } from "../elements";
import { _deleteCommentFX } from "../redux/modules/comments";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(0);
  const [isOpen, setMenu] = React.useState(false);

  const modalUp = () => {
    setMenu(true);
  };
  const modalDown = () => {
    setMenu(false);
  };

  const deleteComm = (commentId) => {
    modalDown();
    dispatch(_deleteCommentFX(commentId));
  };

  return (
    <Fragment>
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
          <Text
            cursor="pointer"
            _onClick={() => {
              deleteComm(props.commentId);
            }}
          >
            삭제하기
          </Text>
          <hr />
          <Text color="red" cursor="pointer">
            신고하기
          </Text>
        </DetailModal>
      )}

      <Grid
        display="flex"
        flexDirection="column"
        _onMouseOver={() => {
          setIsHovering(1);
        }}
        _onMouseOut={() => {
          setIsHovering(0);
        }}
      >
        <Grid
          display="flex"
          alignItems="flex-start"
          margin="10px 0"
          height="60px"
        >
          <Image
            src={props.profileImageUrl}
            imageType="circle"
            size="35"
            margin="5px 15px"
          />
          <Grid display="flex" flexDirection="column">
            <Grid display="flex">
              <Text
                bold
                color="#4B4B4B"
                margin="5px 5px"
                size="14px"
                display="inline"
                width="370px"
              >
                <span style={{ margin: "0 5px 0 0" }}>{props.nickname}</span>
                <span style={{ fontWeight: "500", color: "black" }}>
                  {props.content}
                </span>
              </Text>
              <IconButton
                unLikeIcon
                color="#4B4B4B"
                size="13px"
                margin="3px 5px"
              />
            </Grid>
            <Grid display="flex" margin="5px">
              <Text color="#8E8E8E" margin="0 10px 0 0" size="13px">
                {props.createdAt}
              </Text>
              <Text
                cursor="pointer"
                bold
                color="#8E8E8E"
                margin="0 10px"
                size="13px"
              >
                답글 달기
              </Text>
              {isHovering ? (
                <IconButton
                  _onClick={modalUp}
                  moreView
                  color="#8E8E8E"
                  size="20"
                />
              ) : (
                <IconButton moreView color="white" size="20" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

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

export default CommentItem;
