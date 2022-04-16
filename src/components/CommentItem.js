import React from "react";
import styled from "styled-components";
import Text from "../elements/Text";
import Image from "../elements/Image";
import IconButton from "../elements/IconButton";

const CommentItem=(props)=>{

    return(
        <CommentDiv>
            <div style={{width:"90%",display:"flex",alignItems:"center"}} >
                <Image imageType ="circle"/>
                <Text bold color="#323232" margin="10px">{props.username}</Text>
            </div>
          <Text bold color="#323232" >{props.content}</Text>
          <Text bold color="#323232" size="8px" margin="-2px 0px 0px 0px">{props.insert_dt}</Text>
      </CommentDiv>
      
    )


}
CommentItem.defaultProps={
    username:"ljf_sdfsd",
    content:"생일 축하한다!!ㄴㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㄴㅇㄹㄴㅇ",
    insert_dt:"20201010 11:11",
}


const CommentDiv =styled.div`
width:100%;
border-bottom:1px solid#e4e4e4;
padding:15px;
box-sizing:border-box;
`
export default CommentItem