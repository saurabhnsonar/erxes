import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'meteor/erxes-notifier';
import { compose, gql, graphql } from 'react-apollo';
import { Loading } from '/imports/react-ui/common';
import { KIND_CHOICES } from '/imports/api/integrations/constants';
import { TAG_TYPES } from '/imports/api/tags/constants';
import { Bulk, pagination } from '/imports/react-ui/common';
import { mutations, queries } from '../graphql';
import { CustomersList } from '../components';

class CustomerListContainer extends Bulk {
  render() {
    const {
      queryParams,
      customersQuery,
      totalCountQuery,
      segmentsQuery,
      brandsQuery,
      tagsQuery,
      customerCountsQuery,
      customersListConfigQuery,
      customersAdd,
    } = this.props;

    if (
      customersQuery.loading ||
      totalCountQuery.loading ||
      segmentsQuery.loading ||
      brandsQuery.loading ||
      customerCountsQuery.loading ||
      customersListConfigQuery.loading ||
      tagsQuery.loading
    ) {
      return <Loading title="Customers" />;
    }

    const { customersTotalCount } = totalCountQuery;
    const { loadMore, hasMore } = pagination(queryParams, customersTotalCount);

    let columnsConfig = customersListConfigQuery.fieldsDefaultColumnsConfig;

    // load config from local storage
    const localConfig = localStorage.getItem('erxes_customer_columns_config');

    if (localConfig) {
      columnsConfig = JSON.parse(localConfig);
    }

    // add customer
    const addCustomer = ({ doc, callback }) => {
      customersAdd({
        variables: doc,
      }).then(() => {
        customersQuery.refetch();
        Alert.success('Success');
        callback();
      });
    };

    const updatedProps = {
      ...this.props,
      columnsConfig,

      customers: customersQuery.customers,
      counts: customerCountsQuery.customerCounts,
      segments: segmentsQuery.segments,
      brands: brandsQuery.brands,
      integrations: KIND_CHOICES.ALL_LIST,
      tags: tagsQuery.tags,
      loadMore,
      hasMore,
      bulk: this.state.bulk,
      toggleBulk: this.toggleBulk,
      addCustomer,
    };

    return <CustomersList {...updatedProps} />;
  }
}

CustomerListContainer.propTypes = {
  customersQuery: PropTypes.object,
  segmentsQuery: PropTypes.object,
  tagsQuery: PropTypes.object,
  brandsQuery: PropTypes.object,
  totalCountQuery: PropTypes.object,
  customerCountsQuery: PropTypes.object,
};

export default compose(
  graphql(gql(queries.customers), {
    name: 'customersQuery',
    options: ({ queryParams }) => ({
      variables: {
        params: {
          ...queryParams,
          limit: queryParams.limit || 20,
        },
      },
    }),
  }),
  graphql(gql(queries.customerCounts), {
    name: 'customerCountsQuery',
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
  graphql(gql(queries.tags), {
    name: 'tagsQuery',
    options: () => ({
      variables: {
        type: TAG_TYPES.CUSTOMER,
      },
    }),
  }),
  graphql(gql(queries.customersListConfig), {
    name: 'customersListConfigQuery',
  }),
  graphql(gql(queries.brands), { name: 'brandsQuery' }),
  graphql(gql(queries.totalCustomersCount), { name: 'totalCountQuery' }),
  // mutations
  graphql(gql(mutations.customersAdd), {
    name: 'customersAdd',
  }),
)(CustomerListContainer);
