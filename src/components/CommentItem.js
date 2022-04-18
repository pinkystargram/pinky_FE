import React, { useState } from "react";
import styled from "styled-components";
import { Grid, Image, Text, IconButton } from "../elements";

const CommentItem = (props) => {
  const [isHovering, setIsHovering] = useState(0);

  return (
    <>
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
        <Grid display="flex" alignItems="flex-start" margin="10px 0">
          <Image
            src="https://cdn.mhns.co.kr/news/photo/202003/401582_512253_4343.jpg"
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
                {props.insert_dt}
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
                <IconButton moreView color="#8E8E8E" size="20" />
              ) : (
                <IconButton moreView color="white" size="20" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
CommentItem.defaultProps = {
  nickname: "u_display",
  content: "여기 어딘가요? 너무 가고싶네요ㅠㅠ  ",
  insert_dt: "3일",
};

export default CommentItem;
