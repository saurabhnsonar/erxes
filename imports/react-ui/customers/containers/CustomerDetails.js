import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { Loading } from '/imports/react-ui/common';
import { queries, mutations } from '../graphql';
import { CustomerDetails } from '../components';

const CustomerDetailsContainer = props => {
  const { id, customerDetailQuery, customersEdit, fieldsQuery } = props;

  if (customerDetailQuery.loading || fieldsQuery.loading) {
    return <Loading title="Customers" sidebarSize="wide" spin hasRightSidebar />;
  }

  const save = variables => {
    customersEdit({ variables: { _id: id, ...variables } });
  };

  const updatedProps = {
    ...props,
    customer: {
      ...customerDetailQuery.customerDetail,
      refetch: customerDetailQuery.refetch,
    },
    save,
    customFields: fieldsQuery.fields,
  };

  return <CustomerDetails {...updatedProps} />;
};

CustomerDetailsContainer.propTypes = {
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
)(CustomerDetailsContainer);
