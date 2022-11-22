import React from "react";
import { string, func } from "prop-types";
import "styled-components/macro";
import MaterialIcon from "material-icons-react";

const containerStyle = `
  display: flex;
  justify-content: space-between;

  border: 1px solid #E4E8EC;
  border-radius: 4px;
  padding: 8px 8px 8px 16px;
  font-family: Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;
  font-style: normal;

  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #424D57;

  >i {
    margin-top: 2px;
    cursor: pointer;
  }
`;

const Tag = ({ title, onDelete }) => {
  return (
    <div css={containerStyle}>
      <div>#{title}</div>
      <MaterialIcon icon="delete_forever" size="tiny" onClick={onDelete} />
    </div>
  );
};

Tag.propTypes = {
  title: string.isRequired,
  onDelete: func.isRequired,
};

export default Tag;
