import React from 'react';
import { PageHeader, ContentWrapper, Spinner } from '../../components';
import { usePreference } from './usePreferences';
import { Row, Col, Input, CustomInput } from 'reactstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
import roles from '../../../admin/roles';
import globalMessages from '../../globalMessages';
import { useIntl } from 'react-intl';

function PreferenceLine({
  preference: { preferenceValue, preferenceName, type, superAdminOnly },
  onPreferenceValueChanged,
}) {
  const {
    user: { roles: userRoles },
  } = useContext(UserContext);

  useEffect(() => {
    return () => {};
  }, [preferenceValue]);

  const hide =
    superAdminOnly &&
    !userRoles.find(function (x) {
      return x === roles.superAdmin;
    });

  if (hide) return null;

  function clickSwitchHanlder() {
    if (preferenceValue === '1') {
      onPreferenceValueChanged({ preferenceName, preferenceValue: '0' });
    } else {
      onPreferenceValueChanged({ preferenceName, preferenceValue: '1' });
    }
  }

  function decimalChangeHandler({ target: { value } }) {
    try {
      if (!isNaN(value)) {
        onPreferenceValueChanged({ preferenceName, preferenceValue: value });
      }
    } catch {}
  }

  function stringChangeHandler({ target: { value } }) {
    onPreferenceValueChanged({ preferenceName, preferenceValue: value });
  }

  return (
    <Row className="mb-3">
      <Col xs={{ offset: 3, size: 3 }}>{preferenceName}</Col>
      <Col xs={{ size: 3 }}>
        {type === 'bit' && (
          <div style={{ height: '2.1875rem', paddingBottom: '0.375rem' }}>
            <CustomInput
              id={preferenceName}
              type={'switch'}
              checked={preferenceValue === '1'}
              onChange={clickSwitchHanlder}
            />
          </div>
        )}
        {type === 'decimal' && (
          <Input onChange={decimalChangeHandler} value={preferenceValue} />
        )}
        {type === 'string' && (
          <Input onChange={stringChangeHandler} value={preferenceValue} />
        )}
      </Col>
    </Row>
  );
}

export default function Preferences() {
  const [prefs, setPrefs] = useState([]);
  const { title, preferences, handleSubmit, loading } = usePreference({
    getPreferences,
  });
  const [isEdit, setIsEdit] = useState(false);
  const { formatMessage } = useIntl();

  function getPreferences() {
    return [
      ...prefs.filter(function ({ changed }) {
        return changed;
      }),
    ];
  }

  useEffect(() => {
    setPrefs([...preferences]);
    setIsEdit(false);
    return () => {};
  }, [preferences]);

  function preferenceValueChangeHandler({ preferenceValue, preferenceName }) {
    const preference = prefs.find(function (preference) {
      return preference.preferenceName === preferenceName;
    });
    preference.preferenceValue = preferenceValue;
    preference.changed = true;
    setIsEdit(true);
    setPrefs([...prefs]);
  }

  const buttons = [
    {
      label: formatMessage(globalMessages.saveButton),
      icon: 'fa-save',
      style: 'btn-primary',
      onClick: handleSubmit,
      disabled: !isEdit,
    },
  ];

  return (
    <ContentWrapper>
      <Spinner show={loading} />
      <PageHeader title={title} buttons={buttons} />
      {prefs.map(function (preference) {
        return (
          <PreferenceLine
            preference={preference}
            key={preference.preferenceName}
            onPreferenceValueChanged={preferenceValueChangeHandler}
          />
        );
      })}
    </ContentWrapper>
  );
}
