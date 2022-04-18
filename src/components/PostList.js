import React from "react";
import Post from "../components/Post";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import {useDispatch,useSelector} from "react-redux";

const PostList =()=>{
    const dispatch=useDispatch();
    const postlist=useSelector((state)=>state.post.post)
    React.useEffect(() => {
        dispatch(postActions.getPostDB());
      }, []);

    return(
    
        <PostListWrapper>
            {postlist.map((p, idx) => {
          return <Post key={idx} {...p} />;
        })}
        </PostListWrapper>
   
        

    )
}
const PostListWrapper=styled.div`
width:100%;
margin-top:60px;
`
export default PostList;