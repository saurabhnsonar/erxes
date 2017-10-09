import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { MainLayout } from '../layout/containers';
import { CustomersList, CustomerForm, CustomerDetails } from './containers';

const group = FlowRouter.group({
  prefix: '/customers',
});

group.route('/', {
  name: 'customers/list',
  action(params, queryParams) {
    mount(MainLayout, {
      content: <CustomersList queryParams={queryParams} />,
    });
  },
});

group.route('/edit/:id', {
  name: 'customers/edit',
  action(params) {
    mount(MainLayout, {
      content: <CustomerForm id={params.id} />,
    });
  },
});

group.route('/details/:id', {
  name: 'customers/details',
  action(params, queryParams) {
    mount(MainLayout, { content: <CustomerDetails id={params.id} queryParams={queryParams} /> });
  },
});
