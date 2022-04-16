import React from "react";
import styled from "styled-components";
import IconButton from "../elements/IconButton";
import Image from "../elements/Image";
import logo from "../assets/logo.png";
import {useHistory} from "react-router-dom";


const Header = () => {
  const history=useHistory();
  const goMain=()=>{
    history.push("/");
  }
  const goWrite =()=>{
    history.push("/PostWrite");
  }
  return (
      <HeaderWrap>
        <HeaderWrapper>
          <img src={logo} onClick={goMain} style={{cursor:"pointer"}}/>
          <SearchBar/>
          <IConBtns>
            <IconButton home/>
            <IconButton airplane/>
            <IconButton plusIcon _onClick={goWrite}/>
            <IconButton compass/>
            <IconButton unLikeIcon/>
            <Image imageType="circle"/>
          </IConBtns>
          
        </HeaderWrapper>
      </HeaderWrap>
  );
};

const HeaderWrap=styled.div`
width:100%;
height:50px;
background:white;
border-bottom:1px solid #e4e4e4;
position:fixed;
top:0;
left:0;
z-index:1;
`
const SearchBar =styled.input`
type:text;
border:none;
background:grey;
border-radius:5px;
height:23px;
width:250px;
background:#e4e4e4;
`

const HeaderWrapper=styled.div`
width:1000px;
margin:0 auto;
padding:6px;
box-sizing:border-box;
display:flex;
align-items:center;
justify-content:space-between;
`
const IConBtns =styled.div`
display:flex;
width:300px;
// background:red;
justify-content:space-between;
align-items:center;
`


export default Header;
