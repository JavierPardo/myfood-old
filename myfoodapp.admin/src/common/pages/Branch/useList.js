import { useIntl } from 'react-intl';
import messages from './messages';
import { useDispatch } from 'react-redux';
import {
  addSpinner,
  removeSpinner,
} from '../../../store/actions/applications.actions';
import { useHistory } from 'react-router';
import { ROUTES } from '../../globalConstants';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  branchHttp,
  countryHttp,
  cityHttp,
  zoneHttp,
} from '../../../services/http';

export const fieldsName = {
  NAME: 'name',
  IS_ACTIVE: 'isActive',
  ADDRESS: 'address',
  EMAIL: 'email',
  PHONE: 'phone',
  MOBILE_PHONE: 'mobilePhone',
  WHATSAPP: 'whatsapp',
  WEBSITE: 'website',
  NIT: 'nit',
  ZONE_ID: 'zoneId',
  CITY_ID: 'cityId',
  COUNTRY_ID: 'countryId',
  IS_ACTIVE: 'isActive',
  TAGS: 'tags',
};

export default function useList() {
  const [branches, setBranches] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const history = useHistory();
  const title = formatMessage(messages.branchListTitle);

  function goToCreate() {
    history.push(ROUTES.branch.new);
  }

  function goToEdit(id) {
    history.push(ROUTES.branch.edit.replace(':branchId', id));
  }

  function loadMetadata() {
    dispatch(addSpinner('LOAD_BRANCH_METADATA'));
    return Promise.all([
      countryHttp.getAll(),
      cityHttp.getAll(),
      zoneHttp.getAll(),
    ]).then(function ([countries, cities, zones]) {
      dispatch(removeSpinner('LOAD_BRANCH_METADATA'));
      return {
        countries,
        cities,
        zones,
      };
    });
  }

  function refresh(response = metadata) {
    dispatch(addSpinner('LOAD_BRANCHES'));
    setLoading(true);
    branchHttp
      .getAll()
      .then(function (branchs) {
        return branchs.map(function (b) {
          return {
            ...b,
            countryName: (
              response.countries.find(function (country) {
                return country.id === b.countryId;
              }) || {}
            ).countryName,
            cityName: (
              response.cities.find(function (city) {
                return city.id === b.cityId;
              }) || {}
            ).cityName,
            zoneName: (
              response.zones.find(function (zone) {
                return zone.id === b.zoneId;
              }) || {}
            ).zoneName,
          };
        });
      })
      .then(setBranches)
      .then(function () {
        dispatch(removeSpinner('LOAD_BRANCHES'));
      })
      .then(function () {
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    loadMetadata()
      .then(function (m) {
        setMetadata({ ...m });
        return { ...m };
      })
      .then(refresh)
      .then(function () {
        setLoading(false);
      });
    return () => {};
  }, []);

  return {
    branches,
    goToEdit,
    formatMessage,
    goToCreate,
    loading,
    updateIsActive: branchHttp.updateIsActive,
    refresh: function () {
      refresh();
    },
    title,
  };
}
