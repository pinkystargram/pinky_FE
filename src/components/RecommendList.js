import React from "react";
import styled from "styled-components";
import RecommendItem from "../components/RecommendItem";
import { useSelector } from "react-redux";
import {Text,Grid,Image} from "../elements/index";

const RecommendList =(props)=>{

const userId=useSelector((state)=>state.user.user.email?state.user.user.email:"userId@naver.com")
const nickname=useSelector((state)=>state.user.user.nickname?state.user.user.nickname:"nickname")

    return(
        <>
        <MyProfile>
            <div >
                <Image imageType="circle" size="50"/>
            </div>
            <Grid is_flex >
                <Grid  margin="-20px 0px 0px 0px" padding="0px 10px">
                    <Text bold color="#2a2a2a" size="14px">{userId}</Text>
                    <Text bold color="#949494" size="14px" margin="-14px 0px 0px 0px">{nickname}</Text>
                </Grid>
                <Grid  width="40px" margin="0px -10px 0px 0px">
                    <Text color="rgb(231, 38, 116)" size="12px" bold >전환</Text>
                </Grid>
            </Grid>    
                
            </MyProfile>
            <RecommendHeader>
                <Text bold size="14px">회원님을 위한 추천</Text>
                <Text bold size="8px">모두 보기</Text>
            </RecommendHeader>   
            <RecommendItem/>
            <RecommendItem/>
            <RecommendItem/>
            <RecommendItem/>
            <RecommendItem/>
        </>
            
    )
}
RecommendList.defaultProps={
    userId:"userId@naver.com",
    nickname:"nickname"
}

const MyProfile =styled.div`
width:300px;
padding:10px 10px;
box-sizing:border-box;
display:flex;
align-items:center;
justify-content:space-between;
`

const RecommendHeader=styled.div`
width:300px;
display:flex;
justify-content:space-between;
// background:red;
padding:0px 10px;
box-sizing:border-box;
align-items:center;
`

export default RecommendList;