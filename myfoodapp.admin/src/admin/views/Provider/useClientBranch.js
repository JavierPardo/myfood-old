import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { silenceErrorHandler } from '../../../common/Forms';
import { toValueLabelList, findInSelectList } from '../../../common/utils';

import { branchHttp, clientHttp } from '../../../services/http';

export const useClientBranch = (setClientId) => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [branches, setBranches] = useState([]);
  const store = useStore();

  useEffect(() => {
    clientHttp.default
      .getAll()
      .then((clients) => {
        const { userPreference: { clientId } = {} } = store.getState();
        const valueLabelFormat = toValueLabelList(clients, 'id', 'clientName');
        setClients(valueLabelFormat);
        const currentClient = findInSelectList(clientId, valueLabelFormat);
        setClientId(currentClient);
        return valueLabelFormat[0].value;
      })
      .then(loadBranches)
      .catch(silenceErrorHandler)
      .finally(() => setLoading(false));
  }, []);

  const loadBranches = function (clientId) {
    setLoading(true);
    return branchHttp.default
      .getByClientId(clientId)
      .then((branches) => {
        const valueLabelFormat = toValueLabelList(branches);
        setBranches(valueLabelFormat);
      })
      .catch(silenceErrorHandler)
      .finally(() => setLoading(false));
  };

  return { loading, clients, branches, loadBranches };
};
