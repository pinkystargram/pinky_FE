import React from "react";
import Post from "../components/Post";
import RecommendList from "../components/RecommendList";
import styled from "styled-components";

const Main = () => {
  return (
    <Wrap>
      <Wrapper>
        <Post/>
        <RecommendList/>
      </Wrapper>
    </Wrap>
  
  )
  
};


const Wrap=styled.div`
width:100%;
background:#f1f1f1;
`
const Wrapper=styled.div`
width:1000px;
margin:0 auto;
`


export default Main;
