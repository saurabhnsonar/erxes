import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { CustomerForm } from '../components';
import { Loading } from '/imports/react-ui/common';
import { queries, mutations } from '../graphql';

const CustomerFormContainer = props => {
  const { id, customerDetailQuery, customersEdit, fieldsQuery } = props;

  if (customerDetailQuery.loading || fieldsQuery.loading) {
    return <Loading title="Customers" sidebarSize="wide" spin hasRightSidebar />;
  }

  const save = variables => {
    customersEdit({ variables: { _id: id, ...variables } });
  };

  const updatedProps = {
    ...props,
    save,
    customFields: fieldsQuery.fields,
    customer: customerDetailQuery.customerDetail,
  };

  return <CustomerForm {...updatedProps} />;
};

CustomerFormContainer.propTypes = {
  id: PropTypes.string,
  customerDetailQuery: PropTypes.object,
  fieldsQuery: PropTypes.object,
  customersEdit: PropTypes.func,
};

export default compose(
  graphql(gql(queries.customerDetail), {
    name: 'customerDetailQuery',
    options: ({ id }) => ({
      variables: {
        _id: id,
      },
    }),
  }),
  graphql(gql(mutations.customersEdit), {
    name: 'customersEdit',
  }),
  graphql(gql(queries.fields), {
    name: 'fieldsQuery',
  }),
)(CustomerFormContainer);
