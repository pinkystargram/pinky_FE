import React from "react";
import styled from "styled-components";
import RecommendItem from "../components/RecommendItem";
import Text from "../elements/Text";
import Image from "../elements/Image";

const RecommendList =(props)=>{

const {position}=props;
const styles={position}


    return(
        <>
        <MyProfile>
                <Image imageType="circle" size="50"/>
                <div style={{marginTop:"-20px", marginLeft:"-120px"}}>
                    <Text bold color="#2a2a2a" size="14px">userid</Text>
                    <Text bold color="#949494" size="14px" margin="-14px 0px 0px 0px">username</Text>
                </div>   
                <Text color="#29c5f6" size="10px" bold >전환</Text>
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
const MyProfile =styled.div`
width:300px;
padding:0px 10px;
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