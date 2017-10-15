import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { Meteor } from 'meteor/meteor';
import { Loader } from '/imports/react-ui/common';
import { SegmentsList } from '../components';
import { queries } from '../graphql';

const SegmentListContainer = props => {
  const { segmentsQuery } = props;

  if (segmentsQuery.loading) {
    return <Loader />;
  }

  const updatedProps = {
    ...props,
    segments: segmentsQuery.segments,
    removeSegment({ id }, callback) {
      Meteor.call('customers.removeSegment', id, (...params) => {
        segmentsQuery.refetch();
        callback(...params);
      });
    },
  };

  return <SegmentsList {...updatedProps} />;
};

SegmentListContainer.propTypes = {
  object: PropTypes.object,
  segmentsQuery: PropTypes.object,
};

export default compose(
  graphql(gql(queries.segments), {
    name: 'segmentsQuery',
    options: ({ contentType }) => ({
      fetchPolicy: 'network-only',
      variables: { contentType },
    }),
  }),
)(SegmentListContainer);
