import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
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
      <div>
        content
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
