import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const CommentList = () => {
  // const dispatch = useDispatch();
  // const post_list = useSelector((state) => state.post.post);
  // console.log(post_list);

  // React.useEffect(() => {
  //   dispatch(postActions.getPostDB());
  // }, []);

  return (
    <CommentWrapper>
      <CommentItem />
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  margin-top: 50px;
`;

export default CommentList;
