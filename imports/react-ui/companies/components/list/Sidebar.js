import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Filter as Segments } from '/imports/react-ui/segments/containers';

const propTypes = {
  counts: PropTypes.object.isRequired,
};

function Sidebar({ counts }) {
  return (
    <Wrapper.Sidebar>
      <Segments contentType="company" counts={counts.bySegment} />
    </Wrapper.Sidebar>
  );
}

Sidebar.propTypes = propTypes;

export default Sidebar;
