import React from "react";
import Post from "../components/Post";
import styled from "styled-components";

const PostList =()=>{


    return(
    
        <PostListWrapper>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </PostListWrapper>
   
        

    )
}
const PostListWrapper=styled.div`
width:100%;
margin-top:60px;
`
export default PostList;