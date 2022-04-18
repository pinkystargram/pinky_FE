import React from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Text from "../elements/Text";
import IconButton from "../elements/IconButton";
import CommentList from "../components/CommentList";
import { useHistory } from "react-router-dom";

const Detail = (props) => {
  const history =useHistory();
  const id = props.match.params.id;
  const goBack=()=>{
    history.push("/");
  }
  // const post_idx=post_list.findIndex(p=>p.id===id);
  return (
    <DetailWrapper>
      <ModalBg onClick={goBack}/>
      <DetailModal>
        <ImageDiv>
          <div style={{marginTop:"50px"}}> 
            <Image imageType="rectangle"/>
          </div>
        </ImageDiv>
        <ContentDiv>
          <PostHeader>
            <div style={{width:"90%",display:"flex",alignItems:"center"}} >
              <Image imageType ="circle"/>
              <Text bold color="#323232" margin="10px">{props.username}</Text>
            </div>
            <IconButton moreView size="16px" color="#323232"/>
          </PostHeader>
          <CommentListWrapper>
            <CommentList/>
          </CommentListWrapper>
          <PostContentContent>
            <Text bold >좋아요 {props.likeCnt}개</Text>
            <Text size="14px" margin="-10px 0px 0px 0px">댓글 {props.commentCnt}개 모두보기</Text>
            <Text size="8px">3일전</Text>
          </PostContentContent>
        </ContentDiv>
      </DetailModal>
      
      <div style={{position:"absolute", top:"10px",right:"10px",zIndex:"10"}}>
      <IconButton cancle color="white" _onClick={goBack}/>
      </div>
      
    </DetailWrapper>);
};

Detail.defaultProps={
  username:"sdfwkj_s311",
  commentCnt:234,
  likeCnt:23940,
}

const DetailWrapper=styled.div`
width:100%;

`
const ModalBg=styled.div`
width:100%;
height:100%;
background:rgba(0,0,0,0.8);
position:fixed;
top:0;
left:0;
z-index:2;
cursor:pointer;
`
const DetailModal=styled.div`
max-width:1000px;
width:1000px;
background:white;
height:600px;
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
display:flex;
z-index:5;
`
const ImageDiv=styled.div`
width:50%;
height:600px;
background:black;
z-index:4;
`

const ContentDiv=styled.div`
width:50%;
height:600px;
background:white;
z-index:4;
float:left;
`

const CommentListWrapper=styled.div`
height:600px;
overflow-y:scroll;
`
const PostHeader =styled.div`
width:50%;
height:50px;
display:flex;
align-items:center;
border-bottom:1px solid#e4e4e4;
justify-content:space-between;
padding:0px 10px;
box-sizing:border-box;
position:fixed;
background:white;
`

const PostContentContent =styled.div`
width:50%;
margin-top:-15px;
padding:0px 10px;
box-sizing:border-box;
position:fixed;
bottom:0;
right:100;
background:white;
border-top:1px solid #d3d3d3;
`

export default Detail;
