import React, { useState } from "react";
import { Button, Modal, InputField } from "@livechat/design-system";
import MaterialIcon from "material-icons-react";
import "styled-components/macro";

import api from "../../utils/api";

const tagButtonStyle = `
  grid-area: btn;
  height: 36px;
  width: 50px !important;
`;

const tagsContainerStyle = `
  font-size: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  > span {
   margin: 5px 0px;
   color: #424D57;
  }
`;

const tagElementStyle = `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const deleteIconStyle = `
  cursor: pointer;
  :hover > i {
    color: #d64546;
  }
`;

const buttonStyle = `
  margin-right: 10px 
`;

const tagStyle = `
  display: flex;
  align-items: center;
  justify-content: space-between;

  >div {
    width: 75%;
  }

  >button {
    margin-top: 4px;
  }
`;

const tagHeadingStyle = `
  font-size: 16px;
  color: #424d59;
  line-height: 20px;
`;

export default ({
  can = { tags: [], text: "" },
  setOpen,
  update,
  setCan,
  accessToken,
}) => {
  const [tags, setTags] = useState([...can.tags]);
  const [content, setContent] = useState(can.text);
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const apiRequest = can.id
      ? api.updateCan(can.id, content, tags, accessToken)
      : api.createCan(content, tags, accessToken);
    apiRequest.then(update).then(() => {
      resetState();
      setOpen(false);
    });
  };

  const resetState = () => {
    setTags([]);
    setContent("");
    setCurrentTag("");
    setCan(undefined);
  };

  return (
    <Modal
      onClose={() => {
        setOpen(false);
        resetState();
      }}
      heading={can.text ? "Update canned response" : "Create canned response"}
      footer={
        <React.Fragment>
          <Button
            css={buttonStyle}
            size="large"
            onClick={() => setOpen(false)}
            kind="secondary"
          >
            Close
          </Button>
          <Button primary size="large" onClick={onSubmit} loading={loading}>
            {can.text ? "Update" : "Create"}
          </Button>
        </React.Fragment>
      }
    >
      <>
        <div>
          <InputField
            id={"name"}
            value={content}
            labelText="Canned response text"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Input canned response text"
            required
          />
        </div>
        <div css={tagStyle}>
          <InputField
            id={"tag"}
            value={currentTag}
            labelText="Canned response shortcut"
            onChange={(e) => setCurrentTag(e.target.value)}
            placeholder="Input shortcut"
            required
          />
          <Button
            onClick={() => {
              if (currentTag) {
                setTags([...tags, currentTag]);
              }
              setCurrentTag("");
            }}
            css={tagButtonStyle}
          >
            Add
          </Button>
        </div>
        {Array.isArray(tags) && tags.length > 0 && (
          <span css={tagHeadingStyle}>Added tags</span>
        )}
        <div css={tagsContainerStyle}>
          {tags.map((tag, i) => {
            return (
              <span key={i} css={tagElementStyle}>
                #{tag}
                <span
                  css={deleteIconStyle}
                  onClick={() => {
                    setTags([...tags].filter((element) => element !== tag));
                  }}
                >
                  <MaterialIcon icon="delete_forever" />
                </span>
              </span>
            );
          })}
        </div>
      </>
    </Modal>
  );
};
