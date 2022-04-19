import React from "react";
import PostList from "../components/PostList";
import RecommendList from "../components/RecommendList";
import styled from "styled-components";
import Footer from "../components/Footer";
import MediaQuery, { useMediaQuery } from 'react-responsive'

const Main = () => {
  const isPc = useMediaQuery ({
    query : "(min-width : 1000px) and (max-width :1920px)"
    });
  return (
    <Wrap>
      <Wrapper>
        <PostList/>
        {isPc?<Sidebar>
            <RecommendList/>
          <Footer/>
        </Sidebar>:null}
      </Wrapper>
    </Wrap>
  )
  
};


const Wrap=styled.div`
width:100%;
padding0;
margin:0;
background:#FAFAFA;
height:100%;
`
const Wrapper=styled.div`
max-width:1000px;
margin:0 auto;
display:flex;
align-items: top;
height:100%;
`
const Sidebar=styled.div`
margin-top:100px;
width:300px;
position:sticky;
top:100px;
`
export default Main;
