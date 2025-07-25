import axios from 'axios';
import history from '../history';
import { getCookie } from '../../common/cookies';

import { ROUTES } from '../../common/globalConstants';
 

//const baseUrl = process.env.REACT_APP_API_URL;
const baseUrl = 'https://localhost:44374';
const allowedOrigins = [baseUrl];
const BEConfig = {
  baseURL: `${baseUrl}/api`,
  headers: {},
};

const handleStatusCodes = ({ data, status, ...rest }) => {
  switch (status) {
    case 401:
      history.push(ROUTES.public.login);
      break;
    case 403:
      return { error: 'forbidden' };
    case 404:
      history.push('/404');
      return;
    case 500:
      console.error(`status ${status}: ${JSON.stringify(data)}`);
      history.push('/500');
      return;
    default:
      console.error(`status ${status}: ${JSON.stringify(data)}`);
      return { data, status, ...rest };
  }
};

const handleError = (error) => {
  if (error.response) {
    throw handleStatusCodes(error.response);
  }
  if (error.request) {
    console.error(error.request);
    throw new Error('The request was made but no response was received');
  }
  console.error('Error', error.message);
  console.error(error.config);
  throw new Error(
    'Something happened in setting up the request that triggered an Error'
  );
};

const addConfiguration = (params) => ({ ...BEConfig, ...params });

const processResponse = ({ data }) => data;

axios.interceptors.request.use(
  ({ headers, url, ...config }) => {
    const { origin } = new URL(config.baseURL);
    const tokenAuth = getCookie('Authorization');

    const client = localStorage.getItem('client');
    const branch = localStorage.getItem('branch');
    let newHeaders = headers;
    if (allowedOrigins.includes(origin)) {
      if (tokenAuth) {
        const authorization = tokenAuth;
        newHeaders = { ...newHeaders, authorization };
      }
      if (client) {
        newHeaders = { ...newHeaders, clientId: client };
      }
      if (branch) {
        newHeaders = { ...newHeaders, branchId: branch };
      }
    }
    return { ...config, headers: newHeaders, url: url.toLowerCase() };
  },
  (error) => Promise.reject(error)
);

const request = (config) =>
  axios
    .request(addConfiguration(config))
    .then(processResponse)
    .catch(handleError);

export { request };
