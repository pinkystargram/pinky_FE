import React from "react";
import styled from "styled-components";
import ImageUploadBox from "../components/ImageUplaodBox";


const PostWrite = () => {
  return (
    <> 
      <ImageUploadWrapper>
        <ImageUploadBox/>
      </ImageUploadWrapper>
    </>
  )
  
 
  
};

export default PostWrite;


const ModalBg=styled.div`
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
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
`