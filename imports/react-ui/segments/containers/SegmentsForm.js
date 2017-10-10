import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { SegmentsForm } from '../components';
import { queries } from '../graphql';

const SegmentsFormContainer = props => {
  const { segmentDetailQuery, headSegmentsQuery, segmentsGetFieldsQuery } = props;

  if (segmentDetailQuery.loading || headSegmentsQuery.loading || segmentsGetFieldsQuery.loading) {
    return null;
  }

  const fields = segmentsGetFieldsQuery.segmentsGetFields.map(({ name, label }) => ({
    _id: name,
    title: label,
    selectedBy: 'none',
  }));

  const segment = segmentDetailQuery.segmentDetail;
  const headSegments = headSegmentsQuery.segmentsGetHeads;

  const updatedProps = {
    ...props,
    fields,
    segment,
    headSegments,

    create({ doc }, callback) {
      Meteor.call('customers.createSegment', doc, callback);
    },

    edit({ id, doc }, callback) {
      Meteor.call('customers.editSegment', { id, doc }, callback);
    },
  };

  return <SegmentsForm {...updatedProps} />;
};

SegmentsFormContainer.propTypes = {
  segmentDetailQuery: PropTypes.object,
  headSegmentsQuery: PropTypes.object,
  segmentsGetFieldsQuery: PropTypes.object,
};

export default compose(
  graphql(gql(queries.segmentDetail), {
    name: 'segmentDetailQuery',
    options: ({ id }) => ({
      variables: { _id: id },
    }),
  }),
  graphql(gql(queries.headSegments), { name: 'headSegmentsQuery' }),
  graphql(gql(queries.segmentsGetFields), {
    name: 'segmentsGetFieldsQuery',
    options: ({ kind }) => ({
      variables: { kind },
    }),
  }),
)(SegmentsFormContainer);
