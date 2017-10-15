import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { MainLayout } from '../layout/containers';
import { SegmentsList, SegmentsForm } from './containers';

const group = FlowRouter.group({
  prefix: '/segments',
});

group.route('/:contentType', {
  name: 'segments/list/',
  action({ contentType }) {
    mount(MainLayout, {
      content: <SegmentsList contentType={contentType} />,
    });
  },
});

group.route('/new/:contentType', {
  name: 'segments/new',
  action({ contentType }) {
    mount(MainLayout, {
      content: <SegmentsForm contentType={contentType} />,
    });
  },
});

group.route('/edit/:contentType/:id', {
  name: 'segments/edit',
  action({ contentType, id }) {
    mount(MainLayout, {
      content: <SegmentsForm contentType={contentType} id={id} />,
    });
  },
});
