import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import TranslationContext, { defaultLocale } from './TranslationContext';
import * as Yup from 'yup';
import * as yupES from '../../Forms/yup-es';

const missingTranslationHandler = (err) => {
  if (err.code === 'MISSING_TRANSLATION') {
    //uncomment this to see missing translations when times come
    //console.info('Missing translation', err.message);
    return;
  }
  throw err;
};

const TranlationProvider = ({ children }) => {
  const [locale, updateLocale] = useState(defaultLocale);
  const [config] = useState({
    locale: defaultLocale,
    key: defaultLocale,
    messages: {},
  });
  Yup.setLocale(yupES);
  useEffect(() => {
    //TODO: call to api and get the dictonary
    //Yup.setLocale(locale)
    //const config = { locale, key: locale, messages: dictonary }
    //updateConfig(config);
  }, [locale]);

  return (
    <TranslationContext.Provider value={{ locale, updateLocale, yup: Yup }}>
      <IntlProvider {...config} onError={missingTranslationHandler}>
        {children}
      </IntlProvider>
    </TranslationContext.Provider>
  );
};

export default TranlationProvider;
