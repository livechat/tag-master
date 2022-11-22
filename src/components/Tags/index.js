import React, { useState, Fragment } from "react";
import {
  Button,
  Modal,
  InputField,
  ActionModal,
} from "@livechat/design-system";
import MaterialIcon from "material-icons-react";
import Spinner from "../Spinner";
import Tag from "./Tag";

import "styled-components/macro";
import api from "../../utils/api";

const containerStyle = `
  display: grid;
  grid-gap: 10px;
`;

const labelStyle = `
  margin-right: 10px;
`;

const tagContainerStyle = `
  display: grid;
  grid-gap: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

const helpStyle = `
  width: 100%;
  margin: 10px 0;
  font-size: 15px;
  text-align: center;
  font-family: "Lucida Sans", sans-serif;
`;

const linkStyle = `
  text-decoration: none;
  color: #4384f5;
`;

const buttonStyle = `
  margin-right: 10px 
`;

export default ({ tags, update, accessToken }) => {
  const [remove, setRemove] = useState([]);
  const [open, setOpen] = useState(false);
  const [tagToRemove, setTagToRemove] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tag, setTag] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .createTag(tag, accessToken)
      .then(update)
      .then(() => {
        setOpen(false);
        setLoading(false);
        setTag("");
      });
  };

  return (
    <div css={containerStyle}>
      <Button primary onClick={() => setOpen(true)}>
        <span css={labelStyle}>
          <div
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <span>Add new</span>
            <MaterialIcon icon={"add"} color="white" />
          </div>
        </span>
      </Button>
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          heading="Create tag"
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
                Add tag
              </Button>
            </React.Fragment>
          }
        >
          <div>
            <InputField
              id={"name"}
              value={tag}
              labelText="Tag name"
              onChange={(e) => setTag(e.target.value)}
              placeholder="Input tag name.."
              required
            />
          </div>
        </Modal>
      )}
      {tagToRemove && (
        <ActionModal
          id={"actionModal"}
          onClose={() => setTagToRemove(null)}
          heading="Delete this tag"
          actions={
            <Fragment>
              <Button onClick={() => setTagToRemove(null)} css={buttonStyle}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setRemove([...remove, tagToRemove]);
                  setLoading(true);
                  api
                    .removeTag(tagToRemove, accessToken)
                    .then(() => update())
                    .then(() => {
                      setTagToRemove(null);
                      setLoading(false);
                    });
                }}
                destructive
                loading={loading}
              >
                Delete
              </Button>
            </Fragment>
          }
        >
          <div>
            You are about to delete this tag. This action can’t be undone.
          </div>
        </ActionModal>
      )}
      <div css={tagContainerStyle}>
        {tags ? (
          tags.map((tag, i) => {
            const { name } = tag;
            return (
              <Tag
                key={i}
                title={name}
                onDelete={() => {
                  setTagToRemove(name);
                }}
              />
            );
          })
        ) : (
          <Spinner marginTop="100px" />
        )}
      </div>
      <span css={helpStyle}>
        <a
          href="https://www.livechatinc.com/kb/tagging-chats-and-tickets/"
          target="_blank"
          rel="noopener noreferrer"
          css={linkStyle}
        >
          How to use tags?
        </a>
      </span>
    </div>
  );
};
