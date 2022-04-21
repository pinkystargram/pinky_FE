import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text, Image } from "../elements";
import { _searchUserFX } from "../redux/modules/user";
import { history } from "../redux/configStore";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState(false);

  const searchList = useSelector((state) => state.user.search_user);

  console.log(searchList);

  const goMypage = (userId) => {
    history.push(`/MyPage/${userId}`);
  };

  const openToggle = () => {
    setResult(!result);
  };

  return (
    <>
      <Grid margin="0 auto" width="300px">
        <SearchBox
          onChange={(e) => {
            dispatch(_searchUserFX(e.target.value));
          }}
          placeholder="팔로잉 할 유저를 검색하세요"
          onClick={openToggle}
        />

        {result ? (
          <>
            <ResultBox>
              {searchList?.map((user, idx) => {
                return (
                  <Grid
                    key={idx}
                    display="flex"
                    alignItems="center"
                    margin="15px 0"
                    height="30px"
                  >
                    <img
                      src={user.profileImageUrl}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "100%",
                        margin: "0 15px",
                        border: "1px solid #e4e4e4",
                        backgroundSize: "cover",
                      }}
                    />

                    <Text
                      bold
                      color="#4B4B4B"
                      margin="5px"
                      size="14px"
                      display="inline"
                      width="auto"
                    >
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          goMypage(user.userId);
                          openToggle();
                        }}
                      >
                        {user.nickname}
                      </span>
                    </Text>
                  </Grid>
                );
              })}
            </ResultBox>
          </>
        ) : null}
      </Grid>
    </>
  );
};

const SearchBox = styled.input`
  border: none;
  background: grey;
  border-radius: 5px;
  height: 23px;
  width: 250px;
  background: #e4e4e4;
  padding: 5px;
  :focus {
    outline: 1px solid #e72674;
  }
  ::placeholder {
    font-size: 12px;
  }
`;

const ResultBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  position: absolute;
  top: 44px;
  width: 258px;
  background-color: white;
  height: 250px;
  overflow: auto;
  border: 1px solid #e4e4e4;
  border-top: none;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export default SearchBar;
