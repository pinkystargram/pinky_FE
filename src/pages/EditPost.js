import React from "react";
import styled from "styled-components";
import EditMyDropzone from "../components/EditMyDropZone";
import { IconButton } from "../elements";
import {useHistory} from "react-router-dom";
import Main from "./Main"
import ImageUploadForm from "../components/ImageUploadForm";

const EditPost = (props) => {
  const history =useHistory();
  const id = props.match.params.id;
  console.log(id);
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
      <EditMyDropzone id={id}></EditMyDropzone>
      </ImageUploadWrapper>
      <div style={{position:"absolute", top:"10px",right:"10px",zIndex:"10"}}>
      <IconButton cancle color="white" _onClick={goBack}/>
      </div>
    {/* <ImageUploadForm></ImageUploadForm> */}
    </div>
    </>
  )
};

export default EditPost;


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