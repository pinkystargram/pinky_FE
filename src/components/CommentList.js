import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";

const CommentList=()=>{
    return(
        <CommentWrapper>
            <CommentItem/>
            <CommentItem/>
            <CommentItem/>
            <CommentItem/>
            <CommentItem/>
        </CommentWrapper>
    )
}

const CommentWrapper=styled.div`
margin-top:50px;


`

export default CommentList;