import React from "react";
import Post from "../components/Post";
import styled from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import {useDispatch,useSelector} from "react-redux";
import InfinityScroll from "./InfinityScroll";

const PostList =()=>{
    const dispatch=useDispatch();
    const postlist=useSelector((state)=>state.post.post)
    const paging = useSelector((state) => state.post.paging);
    const is_loading = useSelector((state)=>state.post.is_loading);
    console.log(paging);
    console.log(is_loading);
    console.log(postlist);
    // React.useEffect(() => {
    //     dispatch(postActions.getPostDB());
    //   }, []);
    React.useEffect(()=>{
      if(postlist.length===0){
        dispatch(postActions.getPostDB());
      }
  },[]);
    return(
    
        <PostListWrapper>
          <InfinityScroll
          callNext={() => {console.log("callnext제발"); dispatch(postActions.getPostDB(paging.page));}}
          is_next={paging.page ? true : false}
          loading={is_loading}>
          {postlist.map((p, idx) => {
          return <Post key={idx} {...p} />;
        })}
          </InfinityScroll>
           
        </PostListWrapper>
   
        

    )
}
const PostListWrapper=styled.div`
width:100%;
margin-top:60px;
`
export default PostList;