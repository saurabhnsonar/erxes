import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import Alert from 'meteor/erxes-notifier';
import { Loading } from '/imports/react-ui/common';
import { queries, mutations } from '../graphql';
import { CustomerDetails } from '../components';

const CustomerDetailsContainer = props => {
  const { id, customerDetailQuery, customersEdit, customersAddCompany, fieldsQuery } = props;

  if (customerDetailQuery.loading || fieldsQuery.loading) {
    return <Loading title="Customers" sidebarSize="wide" spin hasRightSidebar />;
  }

  const save = variables => {
    customersEdit({
      variables: { _id: id, ...variables },
    }).then(() => {
      Alert.success('Success');
    });
  };

  const addCompany = ({ doc, callback }) => {
    customersAddCompany({
      variables: { _id: id, ...doc },
    }).then(() => {
      customerDetailQuery.refetch();
      Alert.success('Success');
      callback();
    });
  };

  const updatedProps = {
    ...props,
    customer: {
      ...customerDetailQuery.customerDetail,
      refetch: customerDetailQuery.refetch,
    },
    save,
    addCompany,
    customFields: fieldsQuery.fields,
  };

  return <CustomerDetails {...updatedProps} />;
};

CustomerDetailsContainer.propTypes = {
  id: PropTypes.string,
  customerDetailQuery: PropTypes.object,
  fieldsQuery: PropTypes.object,
  customersEdit: PropTypes.func,
  customersAddCompany: PropTypes.func,
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
  graphql(gql(queries.fields), {
    name: 'fieldsQuery',
  }),
  // mutations
  graphql(gql(mutations.customersEdit), {
    name: 'customersEdit',
  }),
  graphql(gql(mutations.customersAddCompany), {
    name: 'customersAddCompany',
  }),
)(CustomerDetailsContainer);
