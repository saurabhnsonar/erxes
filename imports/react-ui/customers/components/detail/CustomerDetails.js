import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
import { List as InternalNotes } from '/imports/react-ui/internalNotes/containers';
import RightSidebar from './sidebar/RightSidebar';
import LeftSidebar from './sidebar/LeftSidebar';

const propTypes = {
  customer: PropTypes.object.isRequired,
  customFields: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
};

class CustomerDetails extends React.Component {
  render() {
    const { customer } = this.props;

    const breadcrumb = [
      { title: 'Customers', link: FlowRouter.path('customers/list') },
      { title: customer.name || customer.email || 'N/A' },
    ];

    const content = (
      <div className="customer-detail-content">
        <ul className="header">
          <li className="active">
            <a>
              <i className="ion-email" />
              New note
            </a>
          </li>
          <li>
            <a>
              <i className="ion-paper-airplane" />
              Conversations
            </a>
          </li>
        </ul>

        <InternalNotes contentType="customer" contentTypeId={customer._id} />
      </div>
    );

    return (
      <Wrapper
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        leftSidebar={<LeftSidebar {...this.props} />}
        rightSidebar={<RightSidebar customer={customer} />}
        content={content}
      />
    );
  }
}

CustomerDetails.propTypes = propTypes;

export default CustomerDetails;
