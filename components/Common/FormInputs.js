import {
  Form,
  Segment,
  Button,
  Message,
  TextArea,
  Divider,
} from "semantic-ui-react";

const FormInputs = ({
  user: { bio, facebook, instgram, youtube, twitter },
  handleInputs,
  showSocialLinks,
  controls,
  setControls,
}) => {
  return (
    <>
      <Form.Field
        required
        control={TextArea}
        name="bio"
        onChange={handleInputs}
        value={bio}
      ></Form.Field>
      <Button
        content="Add Social links"
        color="red"
        icon="at"
        type="button"
        onClick={() =>
          setControls({ ...controls, showSocialLinks: !showSocialLinks })
        }
      ></Button>
      {showSocialLinks && (
        <>
          <Divider />
          <Form.Input
            icon="facebook"
            iconPosition="left"
            value={facebook}
            name="facebook"
            onChange={handleInputs}
          />
          <Form.Input
            icon="twitter"
            name="twitter"
            iconPosition="left"
            value={twitter}
            onChange={handleInputs}
          />
          <Form.Input
            name="instgram"
            icon="instgram"
            iconPosition="left"
            value={instgram}
            onChange={handleInputs}
          />
          <Form.Input
            icon="youtube"
            name="youtube"
            iconPosition="left"
            value={youtube}
            onChange={handleInputs}
          />

          <Message
            icon={"attention"}
            info
            size="small"
            header="Social media links are optional"
          />
        </>
      )}
    </>
  );
};

export default FormInputs;
