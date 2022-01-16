import React from "react";
import { users } from "../components/Common/userlist";
import { Button, Card, Image } from "semantic-ui-react";
import Search from "../components/Layout/Search";
import styled from "styled-components";
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
function Users() {
  return (
    <div
      style={{
        // backgroundColor: "white",
        width: "100%",
      }}
    >
      <Container>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </Container>
    </div>
  );
}

export default Users;

const User = ({ user }) => {
  return (
    <CardContainer>
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={userPng} />
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>Friend</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="red">
              Ignore
            </Button>
            <Button basic color="blue">
              Follow
            </Button>
          </div>
        </Card.Content>
      </Card>
    </CardContainer>
  );
};

const Container = styled.div`
  /* padding-top: 10px; */
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  /* grid-template-rows: auto; */
`;
const CardContainer = styled.div`
  width: 250px;
  padding: 0px;
  background-color: white;
  margin-top: 0;
  margin-bottom: 10px;
`;
