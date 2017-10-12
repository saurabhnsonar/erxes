import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { KIND_CHOICES } from '/imports/api/integrations/constants';
import { pagination } from '/imports/react-ui/common';
import { queries } from '../graphql';
import { Sidebar } from '../components';

class CompanyListContainer extends React.Component {
  render() {
    const { queryParams, companiesQuery, totalCountQuery } = this.props;

    const { totalCompaniesCount } = totalCountQuery;
    const { loadMore, hasMore } = pagination(queryParams, totalCompaniesCount);

    const updatedProps = {
      ...this.props,

      companies: companiesQuery.companies || [],
      integrations: KIND_CHOICES.ALL_LIST,
      loadMore,
      hasMore,
    };

    return <Sidebar {...updatedProps} />;
  }
}

CompanyListContainer.propTypes = {
  companiesQuery: PropTypes.object,
  totalCountQuery: PropTypes.object,
  queryParams: PropTypes.object,
};

export default compose(
  graphql(gql(queries.companies), {
    name: 'companiesQuery',
    options: ({ queryParams }) => ({
      variables: {
        params: {
          ...queryParams,
          limit: queryParams.limit || 20,
        },
      },
    }),
  }),
  graphql(gql(queries.totalCompaniesCount), { name: 'totalCountQuery' }),
)(CompanyListContainer);
