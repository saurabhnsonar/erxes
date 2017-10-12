import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { MainLayout } from '../layout/containers';
import { Manage } from '../fields/containers';

const group = FlowRouter.group({
  prefix: '/fields',
});

group.route('/manage/:contentType', {
  name: 'fields/manage',
  action(params) {
    mount(MainLayout, { content: <Manage contentType={params.contentType} /> });
  },
});
