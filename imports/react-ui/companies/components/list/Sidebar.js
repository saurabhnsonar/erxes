import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Filter as Segments } from '/imports/react-ui/segments/components';

const propTypes = {
  counts: PropTypes.object.isRequired,
  segments: PropTypes.array.isRequired,
};

function Sidebar({ counts, segments }) {
  return (
    <Wrapper.Sidebar>
      <Segments segments={segments} counts={counts.bySegment} />
    </Wrapper.Sidebar>
  );
}

Sidebar.propTypes = propTypes;

export default Sidebar;
