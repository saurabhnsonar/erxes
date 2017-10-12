import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { Loading } from '/imports/react-ui/common';
import { Bulk, pagination } from '/imports/react-ui/common';
import { queries } from '../graphql';
import { CompaniesList } from '../components';

class CompanyListContainer extends Bulk {
  render() {
    const {
      queryParams,
      companiesQuery,
      totalCountQuery,
      segmentsQuery,
      companiesListConfigQuery,
      companyCountsQuery,
    } = this.props;

    if (
      companiesQuery.loading ||
      totalCountQuery.loading ||
      segmentsQuery.loading ||
      companyCountsQuery.loading ||
      companiesListConfigQuery.loading
    ) {
      return <Loading title="Companies" />;
    }

    const { companiesTotalCount } = totalCountQuery;
    const { loadMore, hasMore } = pagination(queryParams, companiesTotalCount);

    let columnsConfig = companiesListConfigQuery.fieldsDefaultColumnsConfig;

    // load config from local storage
    const localConfig = localStorage.getItem('erxes_company_columns_config');

    if (localConfig) {
      columnsConfig = JSON.parse(localConfig);
    }

    const updatedProps = {
      ...this.props,
      columnsConfig,

      counts: companyCountsQuery.companyCounts,
      companies: companiesQuery.companies,
      segments: segmentsQuery.segments,
      loadMore,
      hasMore,
      bulk: this.state.bulk,
      toggleBulk: this.toggleBulk,
    };

    return <CompaniesList {...updatedProps} />;
  }
}

CompanyListContainer.propTypes = {
  companiesQuery: PropTypes.object,
  segmentsQuery: PropTypes.object,
  totalCountQuery: PropTypes.object,
  companyCountsQuery: PropTypes.object,
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
  graphql(gql(queries.companyCounts), {
    name: 'companyCountsQuery',
    options: ({ queryParams }) => ({
      variables: {
        params: {
          ...queryParams,
          limit: queryParams.limit || 20,
        },
      },
    }),
  }),
  graphql(gql(queries.segments), { name: 'segmentsQuery' }),
  graphql(gql(queries.companiesListConfig), {
    name: 'companiesListConfigQuery',
  }),
  graphql(gql(queries.totalCompaniesCount), { name: 'totalCountQuery' }),
)(CompanyListContainer);
