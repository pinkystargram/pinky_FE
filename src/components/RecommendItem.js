import React from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Text from "../elements/Text";

const RecommendItem =(props)=>{


    return(
        <React.Fragment>
            <RecommendBox>
                <div style={{width:"89%",display:"flex"}}>
                    <Image imageType ="circle" margin="0px 10px 0px 0px"/>
                    <Text bold size="12px">qpinky12</Text>
                </div>
                <Text color="#29c5f6" size="10px" bold >팔로우</Text>
            </RecommendBox>

            
        </React.Fragment>
    )
}
const RecommendBox=styled.div`
width:300px;
// background:red;
height:60px;
padding:10px;
box-sizing:border-box;
display:flex;
align-items:center;
`
export default RecommendItem;