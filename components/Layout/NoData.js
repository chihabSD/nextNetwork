import { Message, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
export const NoProfilePosts = () => (
  <>
    <Message
      info
      icon="meh"
      header="Sorry"
      content="User has not posted anything yet!"
    />
    <Button
      icon="long arrow alternate left"
      content="Go Back"
      as="a"
      href="/"
    />
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <Message
        icon="user outline"
        info
        content={`User does not have followers`}
      />
    )}

    {followingComponent && (
      <Message
        icon="user outline"
        info
        content={`User does not follow any users`}
      />
    )}
  </>
);

export const NoMessages = () => (
  <EmptyNotification>
    <Icon name="mail" size="huge" />
    <NoNotificationTitle>No active messages</NoNotificationTitle>
    <NoNotificationSubTitle>
      You have not messaged anyone yet
    </NoNotificationSubTitle>
    <NoNotificationSubTitle>
      Search or select one of your friend list on the left and start talking!
    </NoNotificationSubTitle>
  </EmptyNotification>

  // <Message
  //   info
  //   icon="telegram plane"
  //   header="Sorry"
  //   content="You have not messaged anyone yet.Search above to message someone!"
  // />
);

export const NoPosts = () => (
  <Message
    info
    icon="meh"
    header="Hey!"
    content="No Posts. Make sure you have followed someone."
  />
);

export const NoProfile = () => (
  <Message info icon="meh" header="Hey!" content="No Profile Found." />
);

export const NoNotifications = () => (
  <EmptyNotification>
    <Icon name="bell" size="huge" />
    <NoNotificationTitle>No notification</NoNotificationTitle>
    <NoNotificationSubTitle>
      When you get notifications, they'll show up here
    </NoNotificationSubTitle>
  </EmptyNotification>
);

export const NoPostFound = () => (
  <Message info icon="meh" header="Hey!" content="No Post Found." />
);

export const NoUserFound = () => (
  // <Message info icon="meh" header="Hey!" content="No Post Found." />
  <NoResultUserFound>No user found</NoResultUserFound>
);

const NoResultUserFound = styled.p`
  display: flex;
  align-items: center;
  color: gray;
`;
const EmptyNotification = styled.div`
  justify-content: center;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoNotificationTitle = styled.h3`
  align-items: center;
`;

const NoNotificationSubTitle = styled.p`
  align-items: center;
  line-height: 0.5rem;
  color: gray;
`;
