import React from "react";
import styled from "styled-components";
import {Grid,IconButton,Text,Image} from "../elements/index";

const DireactMessage =(props)=>{
    console.log(props);
    return(
        <DMWrapper>
            <DMSidebar>
                <DMSidebarHeader>
                    <div>유저의 닉네임(겟요청)</div>
                    <IconButton pencil color="black"/>
                </DMSidebarHeader>
                <DMSidebarContent>
                    <Image imageType="circle" size="40"></Image>
                    <Text margin="7px 10px">디엠을 요청한 사람의 닉네임</Text>
                </DMSidebarContent>
            </DMSidebar>
            <DMBox>
                <DMContentHeader>
                    <Image imageType="circle" size="30"></Image>
                    <Text margin="7px 10px">디엠을 요청한 사람의 닉네임</Text>
                </DMContentHeader>
                <DMContent>  
                <DMIpost>
                    slkdfmlsdf
                </DMIpost>
                <DMUpost>
                    slkfmlskdfmlskdfm
                </DMUpost>
                </DMContent>
                
            </DMBox>
        </DMWrapper>
        
    )
}

const DMWrapper=styled.div`
max-width:1000px;
margin:0 auto;
width:100%;
border:1px solid #EBECF0;
margin-top:100px;
display:flex;
box-sizing:border-box;
`
const DMSidebarContent=styled.div`
width:100%;
padding:10px;
box-sizing:border-box;
display:flex;
`

const DMSidebar=styled.div`
width:300px;
height:600px;
border:1px solid #d3d3d3;
border-right:none;
background:white;
// background:green;
margin:0 auto;
`
const DMSidebarHeader=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
margin:0 auto;
width:100%;
height:50px;
border-bottom:1px solid #d3d3d3;
padding:10px;
box-sizing:border-box;
`

const DMContentHeader=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
margin:0 auto;
width:100%;
height:50px;
border-bottom:1px solid #d3d3d3;
padding:10px;
box-sizing:border-box;
`

const DMBox=styled.div`
width:700px;
height:600px;
border:1px solid #d3d3d3;
margin:0 auto;
box-sizing:border-box;
`

const DMContent=styled.div`
width:100%;
overflow-y:scroll;
padding:10px;
box-sizing:border-box;
`
const DMIpost =styled.div`
display:inline-block;
width:auto;
background:red;
padding:20px;
box-sizing:border-box;
border-radius:20px;
border:1px solid #d3d3d3;
`
const DMUpost =styled.div`
width:auto;
display:inline-block;
background:#EBECF0;
border-radius:20px;
padding:20px;
box-sizing:border-box;
transform:translateX(100%)
`




export default DireactMessage;