import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Pagination } from '/imports/react-ui/common';
import { Widget } from '/imports/react-ui/engage/containers';
import Sidebar from './Sidebar';
import CompanyRow from './CompanyRow';

const propTypes = {
  companies: PropTypes.array.isRequired,
  counts: PropTypes.object.isRequired,
  columnsConfig: PropTypes.array.isRequired,
  segments: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  bulk: PropTypes.array.isRequired,
  toggleBulk: PropTypes.func.isRequired,
};

function CompaniesList({
  companies,
  counts,
  columnsConfig,
  segments,
  loadMore,
  hasMore,
  bulk,
  toggleBulk,
}) {
  const content = (
    <Pagination hasMore={hasMore} loadMore={loadMore}>
      <Table className="no-wrap">
        <thead>
          <tr>
            <th />
            <th>
              <a href="/companies/manage-columns">...</a>
            </th>
            {columnsConfig.map(({ name, label }) => <th key={name}>{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <CompanyRow
              company={company}
              columnsConfig={columnsConfig}
              key={company._id}
              toggleBulk={toggleBulk}
            />
          ))}
        </tbody>
      </Table>
    </Pagination>
  );

  const actionBar = <Wrapper.ActionBar left={<Widget companies={bulk} />} />;
  const breadcrumb = [{ title: `Companies (${counts.all})` }];

  return (
    <div>
      <Wrapper
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        actionBar={bulk.length > 0 ? actionBar : false}
        leftSidebar={<Sidebar counts={counts} segments={segments} />}
        content={content}
      />
    </div>
  );
}

CompaniesList.propTypes = propTypes;

export default CompaniesList;
