import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from "styled-components";
import {Text,IconButton,Image,Input,Grid} from "../elements/index";
import {useState} from "react"
import {useHistory} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {actionCreators as PostActions} from "../redux/modules/post";
import {actionCreators as UserActions} from "../redux/modules/user";

function MyDropzone() {
  const dispatch = useDispatch();
  const history =useHistory();
  const userinfo=useSelector((state)=>state.user.user)
//서버로 보낼 4가지 정보들?
  const userId=useSelector((state)=>state.user.user.email?state.user.user.email:"userId@naver.com")
  const [content, setContent] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [imgFile, setImgFile] = useState(null);

  console.log(content,location,imgFile);
  const [onfile,setOnfile]=useState(false);
  const [myFilename,setmyFilename]=useState("");
  const [isLoaded, setIsLoad] =useState(false);//
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  
  const addpost=()=>{
    dispatch(PostActions.addPostDB(content,imgFile,location))
  }


  const goNext=()=>{
    setIsLoad(true)
  }

  const goBehind=()=>{
    setIsLoad(false);
  }

  const handleChangeFile = (event) => {
    
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); 
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]);
    }
  }
 
  const onDrop= (acceptedFiles, rejectedFiles)=> {
    const myFile = acceptedFiles[0]; 
    const myFilename=myFile.name;
    setmyFilename(myFilename);
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); 
      }
    }
    if (myFile) {
      reader.readAsDataURL(myFile); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(myFile);
      setOnfile(true); // 파일 상태 업데이트
    }
  }

  console.log(onfile);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    if(!isLoaded){
      return(
      <>
      <DropBoxTitle>
        {onfile?<Grid margin="0px 0px 0px 110px"><Text bold>새 게시물 만들기</Text></Grid>
        :<Grid margin="0px 0px 0px 110px"><Text bold>새 게시물 만들기</Text></Grid>}

        <Grid margin="0px -150px 0px 0px">
          {onfile?<Text color="rgb(231, 38, 116)" bold cursor="pointer" _onClick={goNext}>다음</Text>:null}
        </Grid>
      </DropBoxTitle>
      <DrapBox {...getRootProps()}>
      {
        isDragActive ?
        <DragContent>
          <Text>이미지 업로드</Text>
        </DragContent> :
        <DragContent>
          {onfile?<Text>{myFilename}</Text>:<Text bold size="24px" color="#404040">사진과 동영상을 여기다<br/>끌어다 놓으세요</Text>}
          <IconButton photo color="grey" size="50"></IconButton>
        </DragContent>
      }
      <InputLabel for="inputFile">
        <Text bold color="white" cursor="pointer">컴퓨터에서 찾기</Text>
      </InputLabel>
      <input {...getInputProps()} style={{display:"none"}} id="inputFile" onChange={handleChangeFile} multiple
   accept="image/jpg,image/png,image/jpeg,image/gif"/>
    </DrapBox>
      </>
      )
    }
    if(isLoaded){
      return(
        <PostBox>
          <PostBoxTitle>
              <div style={{position:"relative"}}>
                <div style={{position:"absolute", top:"50%",left:"0%",transform:"translate(25%,-10%)", cursor:"pointer"}}>
                  <Grid margin="13px 10px 0px 0px">
                    <IconButton leftArrowIcon _onClick={goBehind} cursor="pointer" color="rgb(231, 38, 116)"/>
                  </Grid>
                  </div>
                <div style={{position:"absolute", top:"50%",left:"50%",transform:"translate(-50%,+50%)"}}>
                  <Text bold margin="0px 50px 0px 0px">새 게시물 만들기</Text>
                </div> 
                <div style={{position:"absolute", top:"0",right:"0",transform:"translate(-25%,-10%)"}}>
                  <Text color="rgb(231, 38, 116)" bold cursor="pointer" _onClick={addpost}>공유하기</Text>
                </div>
            </div>
          </PostBoxTitle>
          <PostContainer>
            <ImageContent>
                <img src={imgBase64} style={{display:"block",width:"100%",maxHeight:"500px",position:"absolute",top:"50%",left:"0",transform:"translate(0%,-50%)",objectFit:"cover"}}></img>
            </ImageContent>
            <ContentContent>
              <PostHeader>
                <div style={{width:"90%",display:"flex",alignItems:"center"}} >
                  <Image imageType ="circle"/>
                  <Text bold color="#323232" margin="10px">{userId}</Text>
                </div>
              </PostHeader>
              <Grid margin="50px 0px 0px 0px">
                <Input multiLine placeholder="문구입력..." _onChange={(e) => {
                setContent(e.target.value);
              }}></Input>
                <hr/>
                <Grid is_flex margin="-260px 0px 0px 0px" padding="10px">
                  <Input placeholder="위치추가" _onChange={(e) => {
                setLocation(e.target.value);
              }}></Input>
                  <IconButton location color="#404040"/>
                </Grid>
              </Grid>
            </ContentContent>
          </PostContainer>
        </PostBox>
      )
    }
}




const DrapBox=styled.div`
width:100%;
max-width:350px;
height:400px;
background:white;
border-radius:0px 0px 20px 20px;
z-index:10;
margin:0 auto;
text-align:center;
padding:10px;
box-sizing:border-box;
`
const DropBoxTitle=styled.div`
width:100%;
min-width:350px;
height:50px;
border-bottom:1px solid grey;
background:white;
border-radius:20px 20px 0px 0px;
z-index:20;
display:flex;
align-items:center;
justify-content:space-between;
button{
  background:trasparent;
  border:none;
  color:skyblue;
  font-weight:600;
  position:absolute;
  top:20px;
  right:20px;
  cursor:pointer;
}
`


const PostBoxTitle=styled.div`
width:100%;
height:50px;
border-bottom:1px solid grey;
z-index:20;
button{
  background:transparent;
  border:none;
  color:skyblue;
  font-weight:600;
  position:absolute;
  top:20px;
  right:20px;
  cursor:pointer;
}
`
const DragContent=styled.div`
margin-top:70px;
`

const PostBox =styled.div`
width:800px;
height:600px;
background:white;
border-radius:20px;
z-index:11;
margin:0 auto;
text-align:center;
padding:5px 0px 0px 0px;
box-sizing:border-box;
`
const ImageContent=styled.div`
background:black;
width:60%;
height:550px;
border-radius:0px 0px 0px 20px;
position:relative;
`
const ContentContent=styled.div`
background:white;
width:40%;
height:550px;
border-radius:0px 0px 20px 0px;
`
const PostContainer=styled.div`
display:flex;
width:100%;
height:800px;
`

const PostHeader =styled.div`
width:40%;
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
const InputLabel=styled.div`
width:200px;
height:50px;
color:white;
background: linear-gradient(
  30deg,
  rgba(231, 38, 116, 1) 0%,
  rgba(187, 61, 146, 1) 21%,
  rgba(134, 78, 155, 1) 58%,
  rgba(50, 81, 119, 1) 97%
);
border-radius:10px;
text-align:center;
cursor:pointer;
position:absolute;
top:70%;
left:50%;
transform:translate(-50%,0%);
&:hover{
  background: linear-gradient(
    -30deg,
    rgba(231, 38, 116, 1) 0%,
    rgba(187, 61, 146, 1) 21%,
    rgba(134, 78, 155, 1) 58%,
    rgba(50, 81, 119, 1) 97%
  );
}
`


export default MyDropzone;


