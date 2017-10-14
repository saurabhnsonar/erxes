import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { ModalTrigger } from '/imports/react-ui/common';
import { Wrapper } from '/imports/react-ui/layout/components';
import { CustomerForm } from '/imports/react-ui/customers/components';

const propTypes = {
  company: PropTypes.object.isRequired,
  customFields: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  addCustomer: PropTypes.func.isRequired,
};

class LeftSidebar extends React.Component {
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
      size: document.getElementById('size').value,
      industry: document.getElementById('industry').value,
      website: document.getElementById('website').value,
      plan: document.getElementById('plan').value,
      customFieldsData,
    });
  }

  renderBasicInfo() {
    const { company } = this.props;
    const { Sidebar } = Wrapper;
    const { Section } = Sidebar;
    const { Title } = Section;

    return (
      <Section className="full">
        <Title>Basic info</Title>

        <div className="sidebar-content">
          <p>
            <label>Name</label>
            <input id="name" defaultValue={company.name} />
          </p>

          <p>
            <label>Size</label>
            <input id="size" defaultValue={company.size} />
          </p>

          <p>
            <label>Industry</label>
            <input id="industry" defaultValue={company.industry} />
          </p>

          <p>
            <label>Website</label>
            <input id="website" defaultValue={company.website} />
          </p>

          <p>
            <label>Plan</label>
            <input id="plan" defaultValue={company.plan} />
          </p>
        </div>
      </Section>
    );
  }

  renderCustomFields() {
    const { company, customFields } = this.props;
    const customFieldsData = company.customFieldsData || {};
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

          <a className="action-link" href="/fields/manage/company">
            Customize
          </a>
        </div>
      </Section>
    );
  }

  renderCustomers() {
    const { company, addCustomer } = this.props;
    const { Sidebar } = Wrapper;
    const { Section } = Sidebar;
    const { Title } = Section;

    return (
      <Section className="full">
        <Title>Customers</Title>

        <div className="sidebar-content">
          {company.customers.map((customer, index) => (
            <div key={index}>
              <p>
                <label>Name:</label>
                <input value={customer.name || 'N/A'} />
              </p>
            </div>
          ))}

          <ModalTrigger
            title="New customer"
            trigger={<a className="action-link" href="#">Add customer</a>}
          >
            <CustomerForm addCustomer={addCustomer} />
          </ModalTrigger>
        </div>
      </Section>
    );
  }

  render() {
    return (
      <Wrapper.Sidebar size="wide">
        <form onSubmit={this.onSubmit} className="cc-detail-form">
          {this.renderBasicInfo()}
          {this.renderCustomers()}
          {this.renderCustomFields()}

          <Button type="submit" bsStyle="success" className="action-btn">
            <i className="ion-checkmark-circled" /> Save changes
          </Button>
        </form>
      </Wrapper.Sidebar>
    );
  }
}

LeftSidebar.propTypes = propTypes;

export default LeftSidebar;
