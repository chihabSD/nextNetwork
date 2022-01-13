import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import CommonInputs from "../components/Common/CommonInputs";
import ImageDropDiv from "../components/Common/ImageDropDiv";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/Common/WelcomeMessage";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { registerUser } from "../utils/authUser";
import uploadPic from "../utils/uploadPicToCloudinary";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const { name, email, password, bio } = user;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const isUser = Object.values({ name, email, password, bio }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();

      const CancelToken = axios.CancelToken;

      const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        }),
      });

      if (errorMsg !== null) setErrorMsg(null);

      if (res.data === "Available") {
        setUsernameAvailable(true);
        setUser((prev) => ({ ...prev, username }));
      }
    } catch (error) {
      setErrorMsg("Username Not Available");
      setUsernameAvailable(false);
    }
    setUsernameLoading(false);
  };

  useEffect(() => {
    username === "" ? setUsernameAvailable(false) : checkUsername();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    let profilePicUrl;
    if (media !== null) {
      profilePicUrl = await uploadPic(media);
    }

    if (media !== null && !profilePicUrl) {
      setFormLoading(false);
      return setErrorMsg("Error Uploading Image");
    }

    await registerUser(user, profilePicUrl, setErrorMsg, setFormLoading);
  };

  return (
    <>
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />

        <Segment>
          <ImageDropDiv
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleChange={handleChange}
          />
          <Form.Input
            required
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fluid
            icon="user"
            iconPosition="left"
          />

          <Form.Input
            required
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
          />

          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? "text" : "password"}
            required
          />

          <Form.Input
            loading={usernameLoading}
            error={!usernameAvailable}
            required
            label="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (regexUserName.test(e.target.value)) {
                setUsernameAvailable(true);
              } else {
                setUsernameAvailable(false);
              }
            }}
            fluid
            icon={usernameAvailable ? "check" : "close"}
            iconPosition="left"
          />

          <CommonInputs
            user={user}
            showSocialLinks={showSocialLinks}
            setShowSocialLinks={setShowSocialLinks}
            handleChange={handleChange}
          />

          <Divider hidden />
          <Button
            icon="signup"
            content="Signup"
            type="submit"
            color="orange"
            disabled={submitDisabled || !usernameAvailable}
          />
        </Segment>
      </Form>

      <FooterMessage />
    </>
  );
}

export default Signup;

// import React, { useState, useEffect, useRef } from "react";
// import {
//   Form,
//   Segment,
//   Button,
//   Message,
//   TextArea,
//   Divider,
// } from "semantic-ui-react";
// import FormInputs from "../components/Common/FormInputs";
// import ImageDrop from "../components/Common/ImageDrop";
// import {
//   FooterMessage,
//   HeaderMessage,
// } from "../components/Common/WelcomeMessage";
// // import { regexUserName } from "../utils/authUser";
// const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
// const Signup = () => {
//   const inputRef = useRef();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     bio: "",
//     facebook: "",
//     youtube: "",
//     twitter: "",
//     instgram: "",
//   });
//   const [username, setUsername] = useState("");
//   const { name, email, password, bio } = user;
//   const [controls, setControls] = useState({
//     showSocialLinks: false,
//     errorMsg: null,
//     formLoading: false,
//     showPassword: false,
//     usernameLoading: false,
//     usernameAvailable: false,
//     submitDisabled: true,
//     // image drop
//     media: null,
//     mediaPreview: true,
//     highlighted: false,
//   });

//   const {
//     formLoading,
//     showPassword,
//     showSocialLinks,
//     usernameAvailable,
//     usernameLoading,
//     submitDisabled,
//     errorMsg,
//   } = controls;
//   let controlled = { ...controls };
//   const handleSubmit = (e) => {
//     // e.preventDefault();

//     console.log(user);
//   };
//   const handleInputs = (evt) => {
//     const { name, value } = evt.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//     // const value = evt.target.value;
//     // setUser({
//     //   ...user,
//     //   [evt.target.name]: value,
//     // });
//   };

//   useEffect(() => {
//     const isUser = Object.values({ name, email, password, bio }).every((item) =>
//       Boolean(item)
//     );
//     isUser
//       ? setControls({ ...controls, submitDisabled: false })
//       : setControls({ ...controls, submitDisabled: true });
//   }, [user]);
//   return (
//     <>
//       <HeaderMessage />
//       {/* <div style={{ marginBottom: "1em" }} /> */}

//       <Form
//         loading={formLoading}
//         error={errorMsg !== null}
//         onSubmit={handleSubmit}
//       >
//         <Message
//           error
//           header="Oops"
//           content={errorMsg}
//           onDismiss={() => setControls({ ...controls, errorMsg: null })}
//         />

//         <Segment>
//           <ImageDrop
//             setControls={setControls}
//             controls={controls}
//             inputRef={inputRef}
//             handleInputs={handleInputs}
//           />
//           {/* NAME */}
//           <Form.Input
//             label="Name"
//             placeholder="Name"
//             required
//             name="name"
//             type="text"
//             value={name}
//             onChange={handleInputs}
//             fluid
//             icon={"user"}
//             iconPosition="left"
//           />

//           {/* EMAIL */}
//           <Form.Input
//             label="Email"
//             placeholder="Email"
//             name="email"
//             value={email}
//             onChange={handleInputs}
//             fluid
//             icon={"envelope"}
//             iconPosition="left"
//             type="email"
//             required
//           />
//           {/* PASSWORD */}
//           <Form.Input
//             label="Password"
//             placeholder="Password"
//             name="password"
//             value={password}
//             onChange={handleInputs}
//             fluid
//             icon={{
//               name: "eye",
//               link: true,
//               circular: true,
//               onClick: () =>
//                 setControls({
//                   ...controls,
//                   showPassword: !showPassword,
//                 }),
//             }}
//             iconPosition="left"
//             type={showPassword ? "text" : "password"}
//             required
//           />
//           {/* USERNAME */}
//           <Form.Input
//             loading={usernameLoading}
//             error={!usernameAvailable}
//             label="Username"
//             placeholder="Username"
//             name="username"
//             value={username}
//             onChange={(e) => {
//               setUsername(e.target.value);
//               // regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/; if()
//               if (regexUserName.test(e.target.value)) {
//                 setControls({ ...controls, usernameAvailable: true });
//                 return;
//               }
//               setControls({ ...controls, usernameAvailable: false });
//             }}
//             fluid
//             icon={usernameAvailable ? "check" : "close"}
//             iconPosition="left"
//             type="text"
//             required
//           />
//           <FormInputs
//             user={user}
//             showSocialLinks={showSocialLinks}
//             handleInputs={handleInputs}
//             controls={controls}
//             setControls={setControls}
//           />
//           <Divider hidden />
//           <Button
//             content="signup"
//             type="submit"
//             color="orange"
//             disabled={submitDisabled || !usernameAvailable}
//           ></Button>
//         </Segment>
//       </Form>
//       <FooterMessage />
//     </>
//   );
// };

// export default Signup;
