import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Segment,
  Button,
  Message,
  TextArea,
  Divider,
} from "semantic-ui-react";
import FormInputs from "../components/Common/FormInputs";
import {
  FooterMessage,
  HeaderMessage,
} from "../components/Common/WelcomeMessage";
// import { regexUserName } from "../utils/authUser";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instgram: "",
  });
  const [username, setUsername] = useState("");
  const { name, email, password, bio } = user;
  const [controls, setControls] = useState({
    showSocialLinks: false,
    errorMsg: null,
    formLoading: false,
    showPassword: false,
    usernameLoading: false,
    usernameAvailable: false,
    submitDisabled: true,
  });

  const {
    formLoading,
    showPassword,
    showSocialLinks,
    usernameAvailable,
    usernameLoading,
    submitDisabled,
    errorMsg,
  } = controls;
  let controlled = { ...controls };
  const handleSubmit = (e) => {
    // e.preventDefault();

    console.log(user);
  };
  const handleInputs = (evt) => {
    const { name, value } = evt.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    // const value = evt.target.value;
    // setUser({
    //   ...user,
    //   [evt.target.name]: value,
    // });
  };

  useEffect(() => {
    const isUser = Object.values({ name, email, password, bio }).every((item) =>
      Boolean(item)
    );
    isUser
      ? setControls({ ...controls, submitDisabled: false })
      : setControls({ ...controls, submitDisabled: true });
  }, [user]);
  return (
    <>
      <HeaderMessage />
      {/* <div style={{ marginBottom: "1em" }} /> */}

      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops"
          content={errorMsg}
          onDismiss={() => setControls({ ...controls, errorMsg: null })}
        />

        <Segment>
          {/* NAME */}
          <Form.Input
            label="Name"
            placeholder="Name"
            required
            name="name"
            type="text"
            value={name}
            onChange={handleInputs}
            fluid
            icon={"user"}
            iconPosition="left"
          />

          {/* EMAIL */}
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleInputs}
            fluid
            icon={"envelope"}
            iconPosition="left"
            type="email"
            required
          />
          {/* PASSWORD */}
          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputs}
            fluid
            icon={{
              name: "eye",
              link: true,
              circular: true,
              onClick: () =>
                setControls({
                  ...controls,
                  showPassword: !showPassword,
                }),
            }}
            iconPosition="left"
            type={showPassword ? "text" : "password"}
            required
          />
          {/* USERNAME */}
          <Form.Input
            loading={usernameLoading}
            error={!usernameAvailable}
            label="Username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              // regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/; if()
              if (regexUserName.test(e.target.value)) {
                setControls({ ...controls, usernameAvailable: true });
                return;
              }
              setControls({ ...controls, usernameAvailable: false });
            }}
            fluid
            icon={usernameAvailable ? "check" : "close"}
            iconPosition="left"
            type="text"
            required
          />
          <FormInputs
            user={user}
            showSocialLinks={showSocialLinks}
            handleInputs={handleInputs}
            controls={controls}
            setControls={setControls}
          />
          <Divider hidden />
          <Button
            content="signup"
            type="submit"
            color="orange"
            disabled={submitDisabled || !usernameAvailable}
          ></Button>
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};

export default Signup;
