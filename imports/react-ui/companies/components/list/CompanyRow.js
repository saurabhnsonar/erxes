import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { FlowRouter } from 'meteor/kadira:flow-router';

const propTypes = {
  company: PropTypes.object.isRequired,
  columnsConfig: PropTypes.array.isRequired,
  toggleBulk: PropTypes.func,
};

function isTimeStamp(value) {
  if (typeof value === 'string') {
    value = parseInt(value);
  }

  return Number.isInteger(value) && value > 1000000000 && value <= 999999999999999;
}

function formatValue(value) {
  if (typeof value === 'boolean') {
    return value.toString();
  }

  if (value && (moment(value, moment.ISO_8601).isValid() || isTimeStamp(value))) {
    return moment(value).fromNow();
  }

  return value || 'N/A';
}

function CompanyRow({ company, columnsConfig, toggleBulk }) {
  const onChange = e => {
    if (toggleBulk) {
      toggleBulk(company, e.target.checked);
    }
  };

  return (
    <tr>
      <td>
        <input type="checkbox" onChange={onChange} />
      </td>
      <td>
        <a href={FlowRouter.path('companies/details', { id: company._id })}>
          <i className="ion-log-in" />
        </a>
      </td>
      {columnsConfig.map(({ name }) => <td key={name}>{formatValue(_.get(company, name))}</td>)}
    </tr>
  );
}

CompanyRow.propTypes = propTypes;

export default CompanyRow;
