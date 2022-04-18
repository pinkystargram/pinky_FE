import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "react-icons";
import { Grid, Text, IconButton } from "../elements";
import styled from "styled-components";
import { _addCommentFX } from "../redux/modules/comments";

const CommentsWrite = (props) => {
  const dispatch = useDispatch();
  const [comm, setComm] = useState("");

  const write = (e) => {
    setComm(e.target.value);
    console.log(comm);
    dispatch(_addCommentFX(props.id, comm));
    setComm("");
  };

  const nickname = localStorage.getItem("nickname");

  return (
    <Grid
      margin="0"
      padding="0 5px"
      borderTop="1px solid #e4e4e4"
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
    >
      <IconButton
        smile
        margin="5px 8px 0 0"
        size="30"
        height="30"
        color="#414141"
      />
      <CommentInput
        type="text"
        placeholder="댓글 달기.."
        value={comm}
        onChange={(e) => {
          setComm(e.target.value);
        }}
        onSubmit={write}
      ></CommentInput>
      {comm.length > 0 ? (
        <Text
          _onClick={write}
          bold
          color="#e72674"
          margin="13px 0px 10px 13px"
          cursor="pointer"
          size="15px"
        >
          게시
        </Text>
      ) : (
        <Text size="15px" bold color="#F2A6C5" margin="13px 0px 10px 13px">
          게시
        </Text>
      )}
    </Grid>
  );
};

const CommentInput = styled.textarea`
  margin: 0;
  border: none;
  padding: 10px;
  width: 85%;
  height: 34px;
  outline: none;
  resize: none;
  box-sizing: border-box;
  overflow: hidden;
  ::placeholder {
    color: #aeaeae;
  }
`;

export default CommentsWrite;
