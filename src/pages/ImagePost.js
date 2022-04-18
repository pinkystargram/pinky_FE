import React from "react";
import styled from "styled-components";
import MyDropzone from "../components/MyDropZone";
import { IconButton } from "../elements";
import {useHistory} from "react-router-dom";
import Main from "../pages/Main"
import ImageUploadForm from "../components/ImageUploadForm";

const ImagePost = () => {
  const history =useHistory();
  const goBack=()=>{
    history.push("/");
  }
  return (
    <> 
    <div style={{marginTop:"100px"}}>
      <Main/>
      <ModalBg onClick={goBack}/>
      <IconButton cancle/>
      <ImageUploadWrapper>
      <MyDropzone></MyDropzone>
      </ImageUploadWrapper>
      <div style={{position:"absolute", top:"10px",right:"10px",zIndex:"10"}}>
      <IconButton cancle color="white" _onClick={goBack}/>
      </div>
    {/* <ImageUploadForm></ImageUploadForm> */}
    </div>
    </>
  )
};

export default ImagePost;


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
const ImageUploadWrapper=styled.div`
margin:0 auto;
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
z-index:5;
`