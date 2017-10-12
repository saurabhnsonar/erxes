import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import Alert from 'meteor/erxes-notifier';
import { Loading } from '/imports/react-ui/common';
import { queries, mutations } from '../graphql';
import { CompanyDetails } from '../components';

const CompanyDetailsContainer = props => {
  const { id, companyDetailQuery, companiesEdit, fieldsQuery } = props;

  if (companyDetailQuery.loading || fieldsQuery.loading) {
    return <Loading title="Companies" sidebarSize="wide" spin hasRightSidebar />;
  }

  const save = variables => {
    companiesEdit({
      variables: { _id: id, ...variables },
    }).then(() => {
      Alert.success('Success');
    });
  };

  const updatedProps = {
    ...props,
    company: {
      ...companyDetailQuery.companyDetail,
      refetch: companyDetailQuery.refetch,
    },
    save,
    customFields: fieldsQuery.fields,
  };

  return <CompanyDetails {...updatedProps} />;
};

CompanyDetailsContainer.propTypes = {
  id: PropTypes.string,
  companyDetailQuery: PropTypes.object,
  fieldsQuery: PropTypes.object,
  companiesEdit: PropTypes.func,
};

export default compose(
  graphql(gql(queries.companyDetail), {
    name: 'companyDetailQuery',
    options: ({ id }) => ({
      variables: {
        _id: id,
      },
    }),
  }),
  graphql(gql(mutations.companiesEdit), {
    name: 'companiesEdit',
  }),
  graphql(gql(queries.fields), {
    name: 'fieldsQuery',
  }),
)(CompanyDetailsContainer);
