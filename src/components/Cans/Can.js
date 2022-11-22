import React from "react";
import { string, func, array } from "prop-types";
import "styled-components/macro";
import MaterialIcon from "material-icons-react";

const containerStyle = `
  border: 1px solid #E4E8EC;
  border-radius: 4px;
  padding: 8px 8px 8px 16px;
  font-family: Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;
  font-style: normal;

  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #424D57;
`;

const canStyle = `
  display: flex;
  justify-content: space-between;

  >span i {
    margin-top: 2px;
    cursor: pointer;
  }
`;

const tagStyle = `
  color: gray;
  font-size: 12px;
  margin-left: 5px;
`;

const Can = ({ title, tags, onDelete, onEdit }) => {
  return (
    <div css={containerStyle}>
      <div css={canStyle}>
        <div>{title}</div>
        <span>
          <MaterialIcon icon="create" size="tiny" onClick={onEdit} />
          <MaterialIcon icon="delete_forever" size="tiny" onClick={onDelete} />
        </span>
      </div>
      <div>
        {tags.map((tag, i) => (
          <span css={tagStyle} key={i}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

Can.propTypes = {
  title: string.isRequired,
  tags: array,
  onDelete: func.isRequired,
  onEdit: func.isRequired,
};

export default Can;
