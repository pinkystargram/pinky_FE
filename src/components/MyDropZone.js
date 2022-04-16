import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from "styled-components";
import {Text,IconButton,Image,Input,Grid} from "../elements/index";
import {useState} from "react"
import {useHistory} from "react-router-dom";
import axios from 'axios';
import { FaRegCaretSquareDown } from 'react-icons/fa';

function MyDropzone() {
  const history =useHistory();
  const [isLoaded, setIsLoad] =useState(false);//
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null);
  const handleChangeFile = (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      console.log(base64);
      if (base64) {
        setImgBase64(base64.toString()); 
        setIsLoad(true)
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  }
 const onDrop = useCallback(async acceptedFiles => {
    console.log(acceptedFiles);
    if(acceptedFiles!=null){
      setIsLoad(true)
    }else{
      setIsLoad(false);
    }
    handleChangeFile(acceptedFiles);
    return;
    const formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    formData.append("file", acceptedFiles[0]);
        console.log(acceptedFiles[0])
    await axios.post("/api/image/upload",formData,config).then((res)=>{
      console.log(res);
    }); 
  }, [])
 

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    if(!isLoaded){
      return(<DrapBox {...getRootProps()}>
      <DropBoxTitle>
        <Text bold>새 게시물 만들기</Text>
      </DropBoxTitle>
      {
        isDragActive ?
        <DragContent>
          <Text>이미지 업로드</Text>
        </DragContent> :
        <DragContent>
          <Text>사진과 동영상을 여기다 끌어다 놓으세요</Text>
          <IconButton photo color="grey" size="50"></IconButton>
        </DragContent>
      }
      <input {...getInputProps()} style={{background:"transparent",marginTop:"50px"}} onChange={handleChangeFile}/>
    </DrapBox>)
    }
    if(isLoaded){
      return(
        <PostBox>
          <PostBoxTitle>
              <div style={{position:"relative"}}>
                <div style={{position:"absolute", top:"50%",left:"50%",transform:"translate(-50%,+50%)"}}>
                  <Text bold margin="0px 50px 0px 0px">새 게시물 만들기</Text>
                </div> 
                <div style={{position:"absolute", top:"0",right:"0",transform:"translate(-25%,-5%)"}}>
                  <Text color="skyblue" bold>공유하기</Text>
                </div>
              </div>
          </PostBoxTitle>
          <PostContainer>

            <ImageContent>
                <img src={imgBase64} style={{width:"100%",position:"absolute",top:"50%", left:"0",transform:"translate(0%,-50%)"}}></img>
            </ImageContent>

            <ContentContent>
              <PostHeader>
                <div style={{width:"90%",display:"flex",alignItems:"center"}} >
                  <Image imageType ="circle"/>
                  <Text bold color="#323232" margin="10px">qpinky12</Text>
                </div>
              </PostHeader>
              <Grid margin="50px 0px 0px 0px">
                <Input multiLine placeholder="내용을 입력하세요"></Input>
                <hr/>
                <Grid is_flex margin="-260px 0px 0px 0px" padding="10px">
                  <Input placeholder="위치추가"></Input>
                  <IconButton location color="#404040"/>
                </Grid>
              </Grid>
            </ContentContent>
          </PostContainer>
        </PostBox>
      )
    }
}

 // const onDrop = useCallback(async acceptedFiles => {
  //   console.log(acceptedFiles);
  //   if(acceptedFiles!=null){
  //     setIsLoad(true)
  //   }else{
  //     setIsLoad(false);
  //   }
  //   const formData = new FormData();
  //   const config = {
  //     header: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   formData.append("file", acceptedFiles[0]);
  //       console.log(acceptedFiles[0])
  //   await axios.post("/api/image/upload",formData,config).then((res)=>{
  //     console.log(res);
  //   });
        
  // }, [])




const DrapBox=styled.div`
width:800px;
height:400px;
background:white;
border-radius:20px;
z-index:10;
margin:0 auto;
text-align:center;
padding:5px 0px 0px 0px;
box-sizing:border-box;
`
const DropBoxTitle=styled.div`
width:100%;
height:30px;
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


export default MyDropzone;