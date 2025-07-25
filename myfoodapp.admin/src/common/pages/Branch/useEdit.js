import { useParams, useHistory } from 'react-router';
import messages from './messages';
import { useEffect } from 'react';
import {
  clientHttp,
  countryHttp,
  cityHttp,
  zoneHttp,
} from '../../../services/http';
import { ROUTES } from '../../globalConstants';
import {
  addSpinner,
  removeSpinner,
  toggleRealoadBranches,
} from '../../../store/actions/applications.actions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { fieldsName } from './useList';
import { toast } from 'react-toastify';
import branchHttp from '../../../services/http/branchHttp';

const initialValues = {
  [fieldsName.NAME]: '',
  [fieldsName.IS_ACTIVE]: true,
  [fieldsName.LOGO_URL]: '',
  [fieldsName.BANNER_URL]: '',
};
const initialMetadata = {
  countries: [],
  cities: [],
  zones: [],
};
export default function useEdit() {
  const [branch, setBranch] = useState(initialValues);
  const [metadata, setMetadata] = useState(initialMetadata);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const history = useHistory();
  const { branchId } = useParams();
  const isEdit = !!branchId;
  const title = formatMessage(isEdit ? messages.editTitle : messages.newTitle);

  function loadMetadata() {
    dispatch(addSpinner('LOAD_BRANCH_METADATA'));
    Promise.all([
      countryHttp.getAll(),
      cityHttp.getAll(),
      zoneHttp.getAll(),
    ]).then(function ([countries, cities, zones]) {
      setMetadata({
        countries: countries.map(function ({ id, countryName }) {
          return { value: id, key: id, label: countryName };
        }),
        cities: cities.map(function ({ id, cityName, countryId }) {
          return { value: id, key: id, label: cityName, countryId };
        }),
        zones: zones.map(function ({ id, zoneName, cityId }) {
          return { value: id, key: id, label: zoneName, cityId };
        }),
      });
      dispatch(removeSpinner('LOAD_BRANCH_METADATA'));
    });
  }

  useEffect(function () {
    refresh();
    loadMetadata();
    return function () {};
  }, []);

  function refresh() {
    if (!isEdit) return;
    dispatch(addSpinner('LOAD_BRANCH'));
    branchHttp
      .getById(branchId)
      .then(setBranch)
      .then(function () {
        dispatch(removeSpinner('LOAD_BRANCH'));
      });
  }

  function goBack() {
    history.push(ROUTES.branch.list);
  }

  function saveBranch(_branch) {
    setLoading(true);
    return (isEdit
      ? branchHttp.updateBranch({ ..._branch })
      : branchHttp.createBranch(_branch)
    ).finally(function () {
      const toastMessage = isEdit
        ? messages.updateSuccess
        : messages.createSuccess;
      toast.success(formatMessage(toastMessage));
      setLoading(false);
      dispatch(toggleRealoadBranches());
      goBack();
    });
  }

  return {
    title,
    branch,
    saveBranch,
    metadata,
    formatMessage,
    loading,
    goBack,
  };
}
