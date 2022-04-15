import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";
import IconButton from "../elements/IconButton";
import Image from "../elements/Image";



const Post = () => {
  return (
    

    <PostContainer>
      <PostHeader>
        <div style={{width:"90%",display:"flex",alignItems:"center"}} >
          <Image imageType ="circle"/>
          <Text bold color="#323232" margin="10px">godnjs13579</Text>
        </div>
        <IconButton moreView size="16px" color="#323232"/>
      </PostHeader>
          <Image shape="rectangle" height="450px" width="100%"/>
        <PostContent width="100%">
          <PostContentHeader>
            <div style={{width:"100px",display:"flex",justifyContent:"space-between"}} >
            <IconButton unLikeIcon/>
            <IconButton message/>
            <IconButton airplane/>
            </div>
            <IconButton bookmark/>
          </PostContentHeader>
          <PostContentContent>
            <Text bold >좋아요 58,089개</Text>
            <Text size="14px" margin="-10px 0px 0px 0px">댓글 277개 모두보기</Text>
            <Text size="8px">3일전</Text>
          </PostContentContent>

        </PostContent>
    </PostContainer>
  
  )
  ;
};



const PostContainer =styled.div`
max-width:614px;
background:white;
border:1px solid #e4e4e4;
`
const PostHeader =styled.div`
width:100%;
height:50px;
display:flex;
align-items:center;
border-bottom:1px solid#e4e4e4;
justify-content:space-between;
padding:0px 10px;
box-sizing:border-box;
`
const PostContent =styled.div`
width:100%;
background:white;
`
const PostContentHeader=styled.div`
width:100%;
height:40px;
padding:10px;
box-sizing:border-box;
display:flex;
justify-content:space-between;
// background:yellow;
`
const PostContentContent =styled.div`
margin-top:-15px;
padding:0px 10px;
box-sizing:border-box;
`


export default Post;