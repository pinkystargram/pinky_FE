import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import { _getCommentFX } from "../redux/modules/comments";
import { useParams } from "react-router-dom";
import { Grid, Text, Image, IconButton } from "../elements";

const CommentList = () => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comments.list);
  console.log(commentList);
  const params = useParams();
  const id = params.id;
  console.log(id);
  const postOne = useSelector((state) => state.post.target.data);
  const MyImage = useSelector((state) => state.user.user.profileImageUrl);
  console.log(MyImage);

  React.useEffect(() => {
    dispatch(_getCommentFX(id));
  }, []);

  if (commentList.length == undefined) {
    console.log("되라 제발");
    return <></>;
  }

  return (
    <CommentWrapper>
      <Grid display="flex" flexDirection="column">
        <Grid display="flex" alignItems="flex-start" margin="10px 0">
          <Image src={MyImage} imageType="circle" size="35" margin="5px 15px" />
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
                <span style={{ margin: "0 5px 0 0" }}>{postOne.nickname}</span>
                <span style={{ fontWeight: "500", color: "black" }}>
                  {postOne.content}
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
                {postOne.createdAt}
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {commentList.map((comment, idx) => {
        return <CommentItem key={idx} {...comment} />;
      })}
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  // background:red;
  width: 100%;
  max-height: 393px;
  margin-top: 50px;
  position: absolute;
  top: 0;
  right: 20;
  z-index: 10;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default CommentList;
