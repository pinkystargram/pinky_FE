import React, { useEffect } from "react";
import { Grid, Text, IconButton, Image } from "../elements";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { _getMyPostFX } from "../redux/modules/mypage";

const MyPost = (props) => {
  const dispatch = useDispatch();
  // const mypost = useSelector((state) => state.mypage.list);
  // const params = useParams();
  // const userId = params.userId;

  console.log(props);

  return (
    <React.Fragment>
      <Grid maxWidth="935px" margin="0 auto" padding="20px 20px 100px 20px">
        <Grid
          Width="935px"
          height="100"
          wrap="wrap"
          display="flex"
          justifyContent="flex-start"
        >
          {props.mypost?.map((e, idx) => {
            console.log(e);
            return (
              <Grid
                key={idx}
                maxWidth="284px"
                maxHeight="284px"
                margin="5px 7px"
              >
                <Image imageType="rectangle" src={e.imageUrl} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyPost;
