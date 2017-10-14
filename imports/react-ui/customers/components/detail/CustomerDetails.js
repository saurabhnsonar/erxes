import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
import { List as InternalNotes } from '/imports/react-ui/internalNotes/containers';
import { ConversationsList, EmptyState } from '/imports/react-ui/common';
import RightSidebar from './sidebar/RightSidebar';
import LeftSidebar from './sidebar/LeftSidebar';

const propTypes = {
  customer: PropTypes.object.isRequired,
  customFields: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
  addCompany: PropTypes.func.isRequired,
};

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentTab: 'internalNotes' };

    this.onTabClick = this.onTabClick.bind(this);
  }

  onTabClick(currentTab) {
    this.setState({ currentTab });
  }

  renderTabContent() {
    const { currentTab } = this.state;
    const { customer } = this.props;

    if (currentTab === 'internalNotes') {
      return <InternalNotes contentType="customer" contentTypeId={customer._id} />;
    }

    if (currentTab === 'conversations') {
      return this.renderConversations();
    }
  }

  renderConversations() {
    const { customer } = this.props;
    const conversations = customer.conversations;

    return (
      <div style={{ position: 'relative' }}>
        {conversations.length
          ? <ConversationsList conversations={conversations} user={Meteor.user()} />
          : <EmptyState
              text="There aren’t any conversations at the moment."
              icon={<i className="ion-email" />}
            />}
      </div>
    );
  }

  render() {
    const { customer } = this.props;
    const { currentTab } = this.state;

    const breadcrumb = [
      { title: 'Customers', link: FlowRouter.path('customers/list') },
      { title: customer.name || customer.email || 'N/A' },
    ];

    const content = (
      <div className="cc-detail-content">
        <ul className="header">
          <li className={currentTab === 'internalNotes' ? 'active' : ''}>
            <a onClick={() => this.onTabClick('internalNotes')}>
              <i className="ion-email" />
              New note
            </a>
          </li>
          <li className={currentTab === 'conversations' ? 'active' : ''}>
            <a onClick={() => this.onTabClick('conversations')}>
              <i className="ion-paper-airplane" />
              Conversations
            </a>
          </li>
        </ul>

        {this.renderTabContent()}
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
