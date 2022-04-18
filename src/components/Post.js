import React from "react";
import styled from "styled-components";
import {Text,IconButton,Image,Grid} from "../elements/index";
import { useHistory } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import CommentsWrite from "./CommentWrite";
import {useDispatch} from "react-redux";


const Post = (props) => {
  const dispatch=useDispatch();
  const [isOpen, setMenu] = React.useState(false)
  const id=props.postId;
  const history = useHistory();
  const goDetail = () => {
    history.push(`/post/${id}`);
  };
  const modalUp=()=>{
      setMenu(true)
  }
  const modalDown=()=>{
      setMenu(false);
  }
  const deletePost=()=>{
    console.log("지금부터 삭제를 시작한다")
    dispatch(postActions.deletePostDB(id));
  }

  const editPost=()=>{
    console.log("지금부터 수정을 시작한다")
  }

  return (
    <PostContainer>
      {isOpen&&<ModalBg onClick={modalDown}>
        <div style={{position:"fixed", top:"20px",right:"20px"}}>
         <IconButton cancle _onClick={modalDown} zIndex="100" color="white" />
        </div>
      </ModalBg>}
      {isOpen&&
      <DetailModal>
        <Text cursor="pointer" _onClick={deletePost}>삭제하기</Text>
        <hr/>
        <Text cursor="pointer" _onClick={editPost}>수정하기</Text>
      </DetailModal>}
      <PostHeader>
        <div style={{ width: "90%", display: "flex", alignItems: "center" }}>
          <Image imageType="circle" />
          <Text bold color="#323232" margin="10px">
            {props.nickname}
          </Text>
        </div>
        <IconButton moreView size="16px" color="#323232" _onClick={modalUp} />
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
display:flex;
flex-direction:column;
justify-content:center;
align-text:center;
align-items:center;
max-width:300px;
width:300px;
background:white;
height:200px;
border-radius:20px;
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
display:flex;
z-index:5;
`

export default Post;
