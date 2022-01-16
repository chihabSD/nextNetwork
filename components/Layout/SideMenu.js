import React from "react";
import { List, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";
import styled from "styled-components";
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
function SideMenu({
  user: {
    unreadNotification,
    unreadMessage,
    username,
    email,
    name,
    profilePicUrl,
  },
  pc = true,
}) {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;
  let menus = [
    { name: "Home", icon: "home" },
    { name: "UserList", icon: "user plus" },
    { name: "Messages", icon: "mail" },
    { name: "Notifications", icon: "bell outline" },
    { name: "Profile", icon: "user" },
    { name: "Settings", icon: "setting" },
    { name: "Logout", icon: "log out" },
  ];
  return (
    <div>
      <UserInfoContainer>
        <ProfileImageContainer>
          <ProfileImage src={userPng}></ProfileImage>
        </ProfileImageContainer>
        <Info>
          <Name>{username}</Name>
          <IsFriend>@{name}</IsFriend>
        </Info>
      </UserInfoContainer>
      <MenuContainer>
        {menus.map((menu) => {
          const { name } = menu;
          if (name === "Home") {
            return (
              <Link href="/">
                <MenuItem key={menu.name}>
                  {/* <Icon name={menu.icon} size="large" /> */}
                  <Icon
                    name={menu.icon}
                    size="large"
                    {...(isActive("/") && { color: "teal" })}
                  />
                  <MenuItemName>{menu.name}</MenuItemName>
                </MenuItem>
              </Link>
            );
          }

          if (name === "UserList") {
            return (
              <Link href="/users">
                <MenuItem key={menu.name}>
                  {/* <Icon name={menu.icon} size="large" /> */}
                  <Icon
                    name={menu.icon}
                    size="large"
                    {...(isActive("/users") && { color: "teal" })}
                  />
                  <MenuItemName>{menu.name}</MenuItemName>
                </MenuItem>
              </Link>
            );
          }

          if (name === "Messages") {
            return (
              <Link href="/messages">
                <MenuItem key={menu.name}>
                  {/* <Icon name={menu.icon} size="large" /> */}
                  <Icon
                    name={unreadMessage ? "hand point right" : "mail outline"}
                    size="large"
                    {...((isActive("/messages") && { color: "teal" }) ||
                      (unreadMessage && { color: "orange" }))}
                  />
                  <MenuItemName>{menu.name}</MenuItemName>
                </MenuItem>
              </Link>
            );
          }
          if (name === "Notifications") {
            return (
              <Link href="/notifications">
                <MenuItem key={menu.name}>
                  {/* <Icon name={menu.icon} size="large" /> */}
                  <Icon
                    name={
                      unreadNotification ? "hand point right" : "bell outline"
                    }
                    size="large"
                    {...((isActive("/notifications") && { color: "teal" }) ||
                      (unreadNotification && { color: "orange" }))}
                  />
                  <MenuItemName>{menu.name}</MenuItemName>
                </MenuItem>
              </Link>
            );
          }

          if (name === "Profile") {
            return (
              <Link href={`/${username}`}>
                <MenuItem key={menu.name}>
                  {/* <Icon name={menu.icon} size="large" /> */}
                  <Icon
                    name={menu.icon}
                    size="large"
                    {...(router.query.username === username && {
                      color: "teal",
                    })}
                  />
                  <MenuItemName>{menu.name}</MenuItemName>
                </MenuItem>
              </Link>
            );
          }

          if (name === "Settings") {
            return (
              // <Link href={`/set${username}`}>
              <Link href={`/settings`}>
                <MenuItem key={menu.name}>
                  {/* <Icon name={menu.icon} size="large" /> */}
                  <Icon
                    name={menu.icon}
                    size="large"
                    {...(isActive("/settings") && { color: "teal" })}
                  />
                  <MenuItemName>{menu.name}</MenuItemName>
                </MenuItem>
              </Link>
            );
          }
          if (name === "Logout") {
            return (
              <MenuItem key={menu.name} onClick={() => logoutUser(email)}>
                {/* <Icon name={menu.icon} size="large" /> */}
                <Icon name={menu.icon} size="large" color={"red"} />
                <MenuItemName>{menu.name}</MenuItemName>
              </MenuItem>
            );
          }
        })}
        {/* {menus.map((menu) => (

          
          <MenuItem key={menu.name}>
            <Icon name={menu.icon} size="large" />
            <MenuItemName>{menu.name}</MenuItemName>
          </MenuItem>
        ))} */}
      </MenuContainer>
    </div>
    // <>
    //   <List
    //     style={{ paddingTop: "1rem" }}
    //     size="big"
    //     verticalAlign="middle"
    //     selection
    //   >

    //     <Link href="/">
    //       <List.Item active={isActive("/")}>
    //         <Icon
    //           name="home"
    //           size="large"
    //           {...(isActive("/") && { color: "teal" })}
    //         />
    //         <List.Content>{pc && <List.Header content="Home" />}</List.Content>
    //       </List.Item>
    //     </Link>
    //     <br />
    //     <List.Item active={isActive("/messages")} as="a" href="/messages">
    //       <Icon
    //         name={unreadMessage ? "hand point right" : "mail outline"}
    //         size="large"
    //         {...((isActive("/messages") && { color: "teal" }) ||
    //           (unreadMessage && { color: "orange" }))}
    //       />
    //       <List.Content>
    //         {pc && <List.Header content="Messages" />}
    //       </List.Content>
    //     </List.Item>
    //     <br />
    //     <Link href="/notifications">
    //       <List.Item active={isActive("/notifications")}>
    //         <Icon
    //           name={unreadNotification ? "hand point right" : "bell outline"}
    //           size="large"
    //           {...((isActive("/notifications") && { color: "teal" }) ||
    //             (unreadNotification && { color: "orange" }))}
    //         />
    //         <List.Content>
    //           {pc && <List.Header content="Notifications" />}
    //         </List.Content>
    //       </List.Item>
    //     </Link>
    //     <br />
    //     <Link href={`/${username}`}>
    //       <List.Item active={router.query.username === username}>
    //         <Icon
    //           name="user"
    //           size="large"
    //           {...(router.query.username === username && { color: "teal" })}
    //         />
    //         <List.Content>
    //           {pc && <List.Header content="Account" />}
    //         </List.Content>
    //       </List.Item>
    //     </Link>
    //     <br />
    //     <List.Item onClick={() => logoutUser(email)}>
    //       <Icon name="log out" size="large" />
    //       <List.Content>{pc && <List.Header content="Logout" />}</List.Content>
    //     </List.Item>
    //   </List>
    // </>
  );
}

export default SideMenu;
const MenuContainer = styled.div`
  /* padding: 10px; */
  -webkit-box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  box-shadow: -2px 0px 5px -27px rgba(0, 0, 0, 0.75);
  background-color: white;
  border-radius: 7px;
  border: 1px solid #f1f1f1;
  width: 250px;
`;
const MenuItem = styled.div`
  margin: 5px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  /* padding-bottom: 15px; */
  border-radius: 10px;
  padding: 15px 10px;
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

const Info = styled.div``;

const Name = styled.p`
  line-height: 0.5rem;
`;
const IsFriend = styled.p`
  color: gray;
  line-height: 0.5rem;
`;

const ProfileImageContainer = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 50%;
`;
