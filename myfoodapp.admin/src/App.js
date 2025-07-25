/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.7.5
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './common/utils';
import Routes from './Routes';
import './Vendor';
import { history } from './services';

import './styles/app.scss';
import './styles/bootstrap.scss';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import { AppSpinner } from './common/components/Spinner';
import { TranlsationProvider } from './common/contexts/TranslationContext';

const toastifyConf = {
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  draggable: false,
  pauseOnHover: true,
};
class App extends Component {
  render() {
    // specify base href from env varible 'PUBLIC_URL'
    // use only if application isn't served from the root
    // for development it is forced to root only
    /* global PUBLIC_URL */
    const basename =
      process.env.NODE_ENV === 'development' ? '/' : PUBLIC_URL || '/';

    return (
      <TranlsationProvider>
        <ToastContainer {...toastifyConf} transition={Slide} />
        <AppSpinner />
        <BrowserRouter basename={basename} history={history}>
          <Routes />
        </BrowserRouter>
      </TranlsationProvider>
    );
  }
}

export default App;
