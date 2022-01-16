import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { List, Image, Search, Icon } from "semantic-ui-react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import baseUrl from "../../utils/baseUrl";
import { NoUserFound } from "../Layout/NoData";
let cancel;

function Header({ user }) {
  const { username } = user;
  const users = [
    { _id: 0, name: "chiahbeddine ahmed" },
    { _id: 1, name: "chiahbeddine ahmed" },
    { _id: 2, name: "chiahbeddine ahmed" },
    { _id: 3, name: "chiahbeddine ahmed" },
    { _id: 4, name: "chiahbeddine ahmed" },
  ];
  const router = useRouter();

  const isActive = (route) => router.pathname === route;
  const userPng =
    "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);

  const toggleShowResult = () => {
    setShowResult(!showResult);
  };
  const handleChange = async (e) => {
    const { value } = e.target;
    setText(value);

    if (value.length === 0) return;
    if (value.trim().length === 0) return;

    setText(value);
    setLoading(true);

    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const token = cookie.get("token");

      const res = await axios.get(`${baseUrl}/api/search/${value}`, {
        headers: { Authorization: token },
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });
      console.log(res.data);

      if (res.data.length === 0) {
        results.length > 0 && setResults([]);

        return setLoading(false);
      }
      setResults(res.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (text.length === 0 && loading) setLoading(false);
  }, [text]);

  return (
    <HeaderContainer>
      <SectionOne>
        <Logo>LOGOO</Logo>
        <SearchContainer>
          {text.length > 1 ? (
            <ResultBox>
              {results.length === 0 ? (
                <NoUserFound />
              ) : (
                results.map((user) => (
                  <Result key={user._id} onClick={() => alert(user)}>
                    <ProfileImageContainer>
                      <ProfileImage src={user.profilePicUrl}></ProfileImage>
                    </ProfileImageContainer>
                    <Info>
                      <Name>{user.name}</Name>
                      <IsFriend>Friend</IsFriend>
                    </Info>
                  </Result>
                ))
              )}
            </ResultBox>
          ) : null}

          <Icon name="search" />
          <SearchBox
            type="search"
            placeholder="Search..."
            onBlur={() => {
              results.length > 0 && setResults([]);
              loading && setLoading(false);
              setText("");
            }}
            value={text}
            onChange={handleChange}
            minCharacters={1}
            //   onResultSelect={(e, data) => Router.push(`/${data.result.username}`)}
          />
        </SearchContainer>
      </SectionOne>
      <SectionTwo>
        <Bell>
          <Icon name="bell outline" size="large" />
        </Bell>
        <Link href={`/${username}`}>
          <ProfileImageContainer>
            <ProfileImage src={userPng}></ProfileImage>
          </ProfileImageContainer>
        </Link>
      </SectionTwo>
      {/* <Logo> LOGOO </Logo>
      <SearchContainer>
        <SearchInnerContainer>
          <SearchBox
            type="search"
            placeholder="Search..."
           
          />
        </SearchInnerContainer>
      </SearchContainer>
      <Profile>NOT</Profile>
      <Profile>Profile</Profile> */}
    </HeaderContainer>
  );
}

export default Header;
const HeaderContainer = styled.div`
  /* height: 50px; */
  border-bottom: 0.5px solid #f1f1f1;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20%;
  /* padding: 0 20px; */
  align-items: center;
`;

// Logo

const SectionOne = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 60px;
  align-items: center;

  justify-content: space-between;
`;
const SectionTwo = styled.div`
  display: flex;
  /* width: 300px; */

  justify-content: space-between;

  flex: 1;
  height: 60px;
  align-items: center;

  /* background-color: blue; */
`;
const Bell = styled.div``;
const Logo = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  /* width: 300px; */
  border-radius: 10px;
  border: 1px solid transparent;
  margin: 0 20px;
  background-color: #edeef0;
  /* background-color: blue; */
  position: relative;
  padding: 10px 10px;
  flex: 1;
  align-items: center;
`;
const SearchInnerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: orange;
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

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
const Info = styled.div``;

const Name = styled.p`
  line-height: 0.5rem;
`;
const IsFriend = styled.p`
  color: gray;
  line-height: 0.5rem;
`;

const Profile = styled.div``;
const ResultRenderer = ({ _id, profilePicUrl, name }) => {
  return (
    <List key={_id}>
      <List.Item>
        <Image src={profilePicUrl} alt="ProfilePic" avatar />
        <List.Content header={name} as="a" />
      </List.Item>
    </List>
  );
};
