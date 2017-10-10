import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Manage as ManageFields } from '/imports/react-ui/fields/containers';

const propTypes = {
  customer: PropTypes.object.isRequired,
  customFields: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
};

class Form extends React.Component {
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

  render() {
    const { customer, customFields } = this.props;
    const customFieldsData = customer.customFieldsData || {};

    const breadcrumb = [
      { title: 'Customers', link: FlowRouter.path('customers/list') },
      { title: customer.name || customer.email || 'N/A' },
    ];

    const content = (
      <div>
        <form onSubmit={this.onSubmit}>
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

          {customFields.map((field, index) => (
            <p key={index}>
              <label>{field.text}</label>
              <input id={field._id} defaultValue={customFieldsData[field._id]} />
            </p>
          ))}

          <button>Submit</button>
        </form>

        <ManageFields contentType="customer" />
      </div>
    );

    return (
      <div>
        <Wrapper header={<Wrapper.Header breadcrumb={breadcrumb} />} content={content} />
      </div>
    );
  }
}

Form.propTypes = propTypes;

export default Form;
