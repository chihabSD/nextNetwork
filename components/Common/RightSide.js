import Link from "next/link";
import React from "react";
import { Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import SearchComponent from "../Layout/Search";
import { users } from "./userlist";
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
const RightSideContainer = () => {
  return (
    <Container>
      <SearchContainer>
        <Icon name="search" />
        <SearchBox
          type="search"
          placeholder="Search for a friend"
          minCharacters={1}
          //   onResultSelect={(e, data) => Router.push(`/${data.result.username}`)}
        />
      </SearchContainer>
      <TitleContainer>
        <Title>Friends</Title>
      </TitleContainer>
      <MenuContainer>
        {users.map((user) => (
          <Link href="/">
            <MenuItem key={user.id}>
              <Image src={userPng} size="mini" circular />
              <MenuItemName>{user.name}</MenuItemName>
            </MenuItem>
          </Link>
        ))}
      </MenuContainer>
    </Container>
  );
};

export default RightSideContainer;
const Container = styled.div`
  /* margin-left: 15px; */
  /* align-items: center; */
  background-color: white;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 70vh;
`;

const MenuContainer = styled.div`
  /* padding: 10px; */
  -webkit-box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  background-color: white;
  /* border-radius: 7px; */
  border-top: 1px solid #f1f1f1;
  /* margin-top: 10px; */
  /* width: 250px; */
`;
const MenuItem = styled.div`
  margin: 5px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  /* padding-bottom: 15px; */
  border-radius: 10px;
  padding: 5px 10px;
  border-bottom: 1px solid #f1f1f1;

  align-items: center;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const MenuItemName = styled.p`
  line-height: 0.5rem;
  margin-left: 10px;
`;

const UserInfoContainer = styled.div`
  padding: 10px;
  -webkit-box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  background-color: white;
  border-radius: 7px;
  border: 1px solid #f1f1f1;
  margin-bottom: 20px;
  width: 250px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Title = styled.h4`
  line-height: 0.5rem;
`;

const TitleContainer = styled.div`
  /* padding: 15px; */
  padding-top: 10px;
  margin-top: 15px;
  padding-bottom: 10px;
  padding-left: 20px;
  display: flex;
  align-items: flex-start;
`;

const SearchContainer = styled.div`
  display: flex;
  /* width: 300px; */
  border-radius: 10px;
  border: 1px solid transparent;
  margin: 0 15px;
  background-color: #edeef0;
  /* background-color: blue; */
  padding: 10px 15px;
  /* flex: 1; */
  align-items: center;
`;

const SearchBox = styled.input`
  display: flex;
  border: none;
  background: transparent;
  margin: 0 10px;
  font-size: 14px;

  outline: none;
  border: none;
  height: 100%;
  /* border-radius: 10px; */
  color: inherit;
  border: 1px solid transparent;
`;
const ResultBox = styled.div`
  position: absolute;
  z-index: 1;
  padding: 0 15px;
  height: auto;
  padding-bottom: 10px;
  top: 50px;
  width: 100%;
  left: 0px;
  border: 1px solid transparent;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  transition: 0.3s;
  border-end-end-radius: 10px;
`;

const Result = styled.div`
  cursor: pointer;
  margin-top: 5px;
  padding: 5px 5px;
  display: flex;
  flex-direction: row;
  border: 1px solid transparent;
  border-radius: 5px;
  align-items: center;
  &:hover {
    background-color: #f1f1f1;
  }
`;
const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 50%;
`;
