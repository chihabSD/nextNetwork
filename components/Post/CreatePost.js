import React, { useState, useRef } from "react";
import { Form, Button, Image, Divider, Message, Icon } from "semantic-ui-react";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../utils/postActions";
import CropImageModal from "./CropImageModal";
import styled from "styled-components";

function CreatePost({ user, setPosts }) {
  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      if (files && files.length > 0) {
        setMedia(files[0]);
        setMediaPreview(URL.createObjectURL(files[0]));
      }
    }

    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const addStyles = () => ({
    textAlign: "center",
    height: "150px",
    width: "150px",
    border: "dotted",
    paddingTop: media === null && "60px",
    cursor: "pointer",
    borderColor: highlighted ? "green" : "black",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let picUrl;

    if (media !== null) {
      picUrl = await uploadPic(media);
      if (!picUrl) {
        setLoading(false);
        return setError("Error Uploading Image");
      }
    }

    await submitNewPost(
      newPost.text,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost,
      setError
    );

    setMedia(null);
    mediaPreview && URL.revokeObjectURL(mediaPreview);
    setTimeout(() => setMediaPreview(null), 3000);
    setLoading(false);
  };

  return (
    <div>
      {showModal && (
        <CropImageModal
          mediaPreview={mediaPreview}
          setMedia={setMedia}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      <FormContainer>
        <Form
          error={error !== null}
          onSubmit={handleSubmit}
          // style={{ backgroundColor: "white" }}
        >
          <Message
            error
            onDismiss={() => setError(null)}
            content={error}
            header="Oops!"
          />

          <TopSection>
            <Form.TextArea
              placeholder="Whats Happening"
              name="text"
              style={{ backgroundColor: "#edeef0" }}
              value={newPost.text}
              onChange={handleChange}
              rows={4}
              width={16}
            />
          </TopSection>
          <ButtomSection>
            <Attachments>
              <Form.Group>
                <Form.Input
                  value={newPost.location}
                  name="location"
                  onChange={handleChange}
                  // label="Add Location"
                  icon="map marker alternate"
                  placeholder="Want to add Location?"
                />
                {/* <input /> */}

                <input
                  ref={inputRef}
                  onChange={handleChange}
                  name="media"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                />
              </Form.Group>
              {/* <div 
              onClick={() => inputRef.current.click()}
              style={addStyles()}
              onDragOver={(e) => {
                e.preventDefault();
                setHighlighted(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setHighlighted(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHighlighted(true);

                const droppedFile = Array.from(e.dataTransfer.files);

                setMedia(droppedFile[0]);
                setMediaPreview(URL.createObjectURL(droppedFile[0]));
              }}
            >
              {media === null ? (
                <Icon name="plus" size="small" />
              ) : (
                <Image
                  style={{ height: "10px", width: "10px" }}
                  src={mediaPreview}
                  alt="PostImage"
                  centered
                  size="medium"
                />
              )}
            </div> */}
              {mediaPreview !== null && (
                <>
                  <Button
                    content="Crop Image"
                    type="button"
                    primary
                    circular
                    onClick={() => setShowModal(true)}
                  />
                </>
              )}
            </Attachments>
            <Button
              positive
              disabled={newPost.text === "" || loading}
              // content={<strong>Post</strong>}
              // style={{ backgroundColor: "#1DA1F2", color: "white" }}
              // icon="send"
              loading={loading}
            >
              Post
            </Button>
          </ButtomSection>
        </Form>
      </FormContainer>
      {/* <Divider /> */}
    </div>
  );
}

export default CreatePost;
const ButtomSection = styled.div`
  display: flex;
  background-color: "#edeef0";
  flex: 1;
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TopSection = styled.div`
  width: "100%";
  display: 1;
  flex: 1;
  flex-direction: row;
  /* background-color: red; */
  align-items: center;
`;
const Attachments = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  margin-right: 10px;
`;

const FormContainer = styled.div`
  box-shadow: 0px 1px 5px -34px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 1px 5px -34px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 1px 5px -34px rgba(0, 0, 0, 0.75);
  border: 1px solid transparent;
  /* margin-right: 20px; */
  margin: auto;
  padding: 15px;
  width: 95%;
  background-color: white;
  margin-bottom: 30px;
`;
