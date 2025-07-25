import { createContext } from 'react';

export const defaultLocale = navigator.language;

const updateConfig = () => {};

const TranslateContext = createContext({
  locale: defaultLocale,
  updateConfig,
  yup: {},
});

export default TranslateContext;
