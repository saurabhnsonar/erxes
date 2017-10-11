/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ManageColumns extends Component {
  render() {
    const { fields } = this.props;

    return (
      <ul>
        {fields.map(field => (
          <li key={field._id}>
            <input type="checkbox" />
            <span>{field.text}</span>
          </li>
        ))}
      </ul>
    );
  }
}

ManageColumns.propTypes = {
  fields: PropTypes.array.isRequired,
};

export default ManageColumns;
