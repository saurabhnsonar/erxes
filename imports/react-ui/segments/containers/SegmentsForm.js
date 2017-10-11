import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { SegmentsForm } from '../components';
import { queries } from '../graphql';

const SegmentsFormContainer = props => {
  const { segmentDetailQuery, headSegmentsQuery, combinedFieldsQuery } = props;

  if (segmentDetailQuery.loading || headSegmentsQuery.loading || combinedFieldsQuery.loading) {
    return null;
  }

  const fields = combinedFieldsQuery.fieldsCombinedByContentType.map(({ name, label }) => ({
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
  combinedFieldsQuery: PropTypes.object,
};

export default compose(
  graphql(gql(queries.segmentDetail), {
    name: 'segmentDetailQuery',
    options: ({ id }) => ({
      variables: { _id: id },
    }),
  }),
  graphql(gql(queries.headSegments), { name: 'headSegmentsQuery' }),
  graphql(gql(queries.combinedFields), {
    name: 'combinedFieldsQuery',
    options: ({ contentType }) => ({
      variables: { contentType },
    }),
  }),
)(SegmentsFormContainer);
