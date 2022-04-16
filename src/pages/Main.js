import React from "react";
import PostList from "../components/PostList";
import RecommendList from "../components/RecommendList";
import styled from "styled-components";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <Wrap>
      <Wrapper>
        <PostList/>
        <Sidebar>
          <RecommendList/>
          <Footer/>
        </Sidebar>
      </Wrapper>
    </Wrap>
  )
  
};


const Wrap=styled.div`
width:100%;

`
const Wrapper=styled.div`
width:1000px;
margin:0 auto;
display:flex;
position:relative;
`
const Sidebar=styled.div`
width:300px;
position:fixed;
top:20%;
right:300px;
`
export default Main;
