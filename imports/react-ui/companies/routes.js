import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { MainLayout } from '../layout/containers';
import { ManageColumns } from '../fields/containers';
import { CompaniesList, CompanyForm, CompanyDetails } from './containers';

const group = FlowRouter.group({
  prefix: '/companies',
});

group.route('/', {
  name: 'companies/list',
  action(params, queryParams) {
    mount(MainLayout, {
      content: <CompaniesList queryParams={queryParams} />,
    });
  },
});

group.route('/edit/:id', {
  name: 'companies/edit',
  action(params) {
    mount(MainLayout, {
      content: <CompanyForm id={params.id} />,
    });
  },
});

group.route('/details/:id', {
  name: 'companies/details',
  action(params, queryParams) {
    mount(MainLayout, { content: <CompanyDetails id={params.id} queryParams={queryParams} /> });
  },
});

group.route('/manage-columns', {
  name: 'companies/manageColumns',
  action() {
    mount(MainLayout, { content: <ManageColumns contentType="company" /> });
  },
});
