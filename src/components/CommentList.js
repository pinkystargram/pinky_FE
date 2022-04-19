import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { _getCommentFX } from "../redux/modules/comments";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comments.list);
  console.log(commentList);
  const params = useParams();
  const id = params.id;
  console.log(id);

  React.useEffect(() => {
    dispatch(_getCommentFX(id));
  }, []);

  if (commentList.length == undefined) {
    console.log("되라 제발");
    return <></>;
  }

  return (
    <CommentWrapper>
      {commentList.map((comment, idx) => {
        return <CommentItem key={idx} {...comment} />;
      })}
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  // background:red;
  width:100%;
  max-height:393px;
  margin-top: 50px;
  position:absolute;
  top:0;
  right:20;
  z-index:10;
  overflow-y:scroll;
  overflow-x:hidden;
`;

export default CommentList;
