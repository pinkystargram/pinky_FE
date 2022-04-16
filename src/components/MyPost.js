import React from "react";
import { Grid, Text, IconButton, Image } from "../elements";
import styled from "styled-components";

const MyPost = () => {
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
          <Grid maxWidth="284px" maxHeight="284px" margin="5px 7px">
            <Image
              imageType="rectangle"
              src="https://cdn.mhns.co.kr/news/photo/202003/401582_512254_4344.jpg"
            />
          </Grid>
          <Grid maxWidth="284px" maxHeight="284px" margin="5px 7px">
            <Image
              imageType="rectangle"
              src="http://file.instiz.net/data/file/20120831/c/f/e/cfe3cf78aaed04c621f0726d864385bb"
            />
          </Grid>
          <Grid maxWidth="284px" maxHeight="284px" margin="5px 7px">
            <Image
              imageType="rectangle"
              src="https://file.mk.co.kr/meet/neds/2020/03/image_readtop_2020_226503_15832856704110300.jpg"
            />
          </Grid>
          <Grid maxWidth="284px" maxHeight="284px" margin="5px 7px">
            <Image
              imageType="rectangle"
              src="https://img.wkorea.com/w/2020/03/style_5e732d2b90e52.jpg"
            />
          </Grid>
          <Grid maxWidth="284px" maxHeight="284px" margin="5px 7px">
            <Image
              imageType="rectangle"
              src="https://i.pinimg.com/736x/2b/bb/30/2bbb30b8436b10811871d9977c0515f3.jpg"
            />
          </Grid>
          <Grid maxWidth="284px" maxHeight="284px" margin="5px 7px">
            <Image
              imageType="rectangle"
              src="http://file.instiz.net/data/file/20120831/c/f/e/cfe3cf78aaed04c621f0726d864385bb"
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyPost;
