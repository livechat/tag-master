import React, { useState, Fragment } from "react";
import { Button, ActionModal } from "@livechat/design-system";
import MaterialIcon from "material-icons-react";
import Spinner from "../Spinner";
import EditModal from "./EditModal";
import Can from "./Can";

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

export default ({ cans, accessToken, update }) => {
  const [remove, setRemove] = useState([]);
  const [open, setOpen] = useState(false);

  const [canToRemove, setCanToRemove] = useState(null);
  const [loading, setLoading] = useState(false);

  const [updateCan, setUpdateCan] = useState(undefined);

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
        <EditModal
          can={updateCan}
          setOpen={setOpen}
          update={update}
          accessToken={accessToken}
          setCan={setUpdateCan}
        />
      )}
      {canToRemove && (
        <ActionModal
          onClose={() => setCanToRemove(null)}
          heading="Delete this canned response"
          actions={
            <Fragment>
              <Button onClick={() => setCanToRemove(null)} css={buttonStyle}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setRemove([...remove, canToRemove]);
                  setLoading(true);
                  api
                    .removeCan(canToRemove, accessToken)
                    .then(() => update())
                    .then(() => {
                      setCanToRemove(null);
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
            You are about to delete this canned response. This action can’t be
            undone.
          </div>
        </ActionModal>
      )}
      <div css={tagContainerStyle}>
        {cans ? (
          cans.map((can, i) => {
            const { id } = can;
            return (
              <Can
                key={i}
                title={can.text}
                tags={can.tags}
                onEdit={() => {
                  setOpen(true);
                  setUpdateCan(can);
                }}
                onDelete={() => {
                  setCanToRemove(id);
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
          href="https://www.livechatinc.com/kb/canned-responses/"
          rel="noopener noreferrer"
          target="_blank"
          css={linkStyle}
        >
          How to use canned response?
        </a>
      </span>
    </div>
  );
};
