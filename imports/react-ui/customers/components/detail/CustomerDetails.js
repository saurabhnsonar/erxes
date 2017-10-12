import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Button } from 'react-bootstrap';
import { Wrapper } from '/imports/react-ui/layout/components';
import RightSidebar from './sidebar/RightSidebar';

const propTypes = {
  customer: PropTypes.object.isRequired,
  customFields: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
};

class CustomerDetails extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const customFieldsData = {};

    this.props.customFields.forEach(field => {
      customFieldsData[field._id] = document.getElementById(field._id).value;
    });

    this.props.save({
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      customFieldsData,
    });
  }

  renderBasicInfo() {
    const { customer } = this.props;
    const { Sidebar } = Wrapper;
    const { Section } = Sidebar;
    const { Title } = Section;

    return (
      <Section className="full">
        <Title>Basic info</Title>

        <div className="sidebar-content">
          <p>
            <label>Name</label>
            <input id="name" defaultValue={customer.name} />
          </p>

          <p>
            <label>Email</label>
            <input id="email" defaultValue={customer.email} />
          </p>

          <p>
            <label>Phone</label>
            <input id="phone" defaultValue={customer.phone} />
          </p>
        </div>
      </Section>
    );
  }

  renderCustomFields() {
    const { customer, customFields } = this.props;
    const customFieldsData = customer.customFieldsData || {};
    const { Sidebar } = Wrapper;
    const { Section } = Sidebar;
    const { Title } = Section;

    return (
      <Section className="full">
        <Title>About</Title>

        <div className="sidebar-content">
          {customFields.map((field, index) => (
            <p key={index}>
              <label>{field.text}</label>
              <input id={field._id} defaultValue={customFieldsData[field._id]} />
            </p>
          ))}

          <a className="customize-properties" href="/fields/manage/customer">
            Customize
          </a>
        </div>
      </Section>
    );
  }

  render() {
    const { customer } = this.props;

    const breadcrumb = [
      { title: 'Customers', link: FlowRouter.path('customers/list') },
      { title: customer.name || customer.email || 'N/A' },
    ];

    const sidebar = (
      <Wrapper.Sidebar size="wide">
        <form onSubmit={this.onSubmit} className="customer-detail-form">
          {this.renderBasicInfo()}
          {this.renderCustomFields()}

          <Button bsStyle="success" className="action-btn">
            <i className="ion-checkmark-circled" /> Save changes
          </Button>
        </form>
      </Wrapper.Sidebar>
    );

    const content = (
      <div>
        content
      </div>
    );

    return (
      <Wrapper
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        leftSidebar={sidebar}
        rightSidebar={<RightSidebar customer={customer} />}
        content={content}
      />
    );
  }
}

CustomerDetails.propTypes = propTypes;

export default CustomerDetails;
