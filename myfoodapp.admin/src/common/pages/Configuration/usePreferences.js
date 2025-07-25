import { useIntl } from 'react-intl';
import messages from './messages';
import { useEffect } from 'react';
import { branchPreferenceHttp } from '../../../services/http';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function usePreference({ getPreferences }) {
  const { formatMessage } = useIntl();
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadData() {
    return Promise.all([branchPreferenceHttp.getAll()]).then(function ([
      branchPreferences,
    ]) {
      setPreferences(branchPreferences);
    });
  }

  function handleSubmit() {
    const prefs = getPreferences();
    setLoading(true);
    Promise.all(
      prefs.map(function (pref) {
        return branchPreferenceHttp.update(pref);
      })
    )
      .then(function () {
        return branchPreferenceHttp.getAll();
      })
      .then(function (response) {
        toast.success(formatMessage(messages.branchPreferenceUpdatedSucess));
        setPreferences([...response]);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  useEffect(function () {
    loadData();

    return function () {};
  }, []);

  return {
    title: formatMessage(messages.title),
    preferences,
    handleSubmit,
    loading,
  };
}
