import React from 'react';
import { ContentWrapper } from '../../common/components';
import { Card, Spinner, CardBody } from 'reactstrap';
import DataTable from 'react-data-table-component';

export default function EntityList({ data, loading, columns }) {
  return (
    <ContentWrapper>
      <Card className="card-default">
        <Spinner show={loading} />
        <CardBody>
          <DataTable columns={columns} data={data} pagination />
        </CardBody>
      </Card>
    </ContentWrapper>
  );
}
