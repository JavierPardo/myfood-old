import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Card, CardBody } from 'reactstrap';
import { UserContext } from '../../../common/contexts/UserContext';
import roles from '../../roles';
import Select from '../../../common/components/Select';
import { Spinner } from '../../../common/components';
import { InlineField } from '../../../common/Forms';
import { toSelectList, toIdList } from '../../../common/utils';
import { useClientBranch } from './useClientBranch';
import messages from './messages';

const BranchSelector = ({
  isEdit,
  isReadOnly,
  branchesByProvider,
  onBranchesSeleted,
  loading:parentLoading,
  invalid,
}) => {
  const { formatMessage } = useIntl();
  const [clientId, setClientId] = useState(0);
  const [branchesSelected, setBranchesSelected] = useState([]);
  const { user } = useContext(UserContext);
  const isSuperAdmin = user.roles.includes(roles.superAdmin);
  const { loading, clients, branches, loadBranches } = useClientBranch(
    setClientId
  );

  useEffect(() => {
    if (branchesByProvider === null) {
      return;
    }
    const seletecFormated = toSelectList(
      branchesByProvider,
      'branchId',
      branches
    );
    setBranchesSelected(seletecFormated);
  }, [branchesByProvider, branches]);

  const handleClientSelect = (selected) => {
    setClientId(selected);
    onBranchesSeleted([]);
    loadBranches(selected.value);
  };

  const handleBranchSelect = (selectedValues) => {
    onBranchesSeleted(selectedValues.map(function (selectedBranch) { return { ...selectedBranch, branchId: selectedBranch.value } }));
  };

  return (
    <Card className="card-default">
      <Spinner show={loading||parentLoading} />
      <CardBody>
        <InlineField labelText={formatMessage(messages.clientFieldLabel)}>
          <Select
            placeholder={formatMessage(messages.clientFieldLabel)}
            value={clientId}
            onChange={handleClientSelect}
            options={clients}
            isDisabled={true || !isSuperAdmin}
          />
        </InlineField>
        <InlineField
          labelText={formatMessage(messages.branchFieldLabel)}
          labelRequired
          error={invalid}
        >
          <Select
            placeholder="Seleccione sucursales"
            value={branchesSelected}
            onChange={handleBranchSelect}
            options={branches}
            isMulti
            isDisabled={isReadOnly}
            className={invalid ? 'is-invalid' : ''}
          />
        </InlineField>
        
      </CardBody>
    </Card>
  );
};

BranchSelector.propTypes = {
  isReadOnly: PropTypes.bool,
  isEdit: PropTypes.bool,
  branchesByProvider: PropTypes.arrayOf(
    PropTypes.shape({
      branchId: PropTypes.number,
      logisticProviderId: PropTypes.number,
    })
  ),
  onBranchesSeleted: PropTypes.func,
};

BranchSelector.defaultProps = {
  isEdit: false,
  branchesByProvider: [],
};

export default BranchSelector;
