import React from 'react';

import { Link } from 'react-router-dom';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import { useDispatch } from 'react-redux';

import ToggleFullscreen from '../Common/ToggleFullscreen';

import { toggleSetting } from '../../store/actions/actions';
import messages from './messages';
import { useIntl } from 'react-intl';
import ClienBranchSelection from './ClienBranchSelection';
import { useLogout } from '../hooks/useLogout';
import { ROUTES } from '../globalConstants';

export default function Header() {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const logout = useLogout();

  function toggleAside(e) {
    e.preventDefault();
    dispatch(toggleSetting('asideToggled'));
  }

  function toggleCollapsed(e) {
    e.preventDefault();
    dispatch(toggleSetting('isCollapsed'));
    resize();
  }

  function resize() {
    // all IE friendly dispatchEvent
    var evt = document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
    // modern dispatchEvent way
    // window.dispatchEvent(new Event('resize'));
  }

  function toggleOffsidebar(e) {
    e.preventDefault();
    dispatch(toggleSetting('offsidebarOpen'));
  }
  return (
    <header className="topnavbar-wrapper">
      {/* START Top Navbar */}
      <nav className="navbar topnavbar">
        {/* START navbar header */}
        <div className="navbar-header">
          <a className="navbar-brand" href="#/">
            <div className="brand-logo">
              <img
                className="img-fluid"
                src="img/text_logo_light.png"
                alt="App Logo"
              />
            </div>
            <div className="brand-logo-collapsed">
              <img
                className="img-fluid"
                src="img/logo_small.png"
                alt="App Logo"
              />
            </div>
          </a>
        </div>
        {/* END navbar header */}

        {/* START Left navbar */}
        <ul className="navbar-nav mr-auto flex-row">
          <li className="nav-item">
            {/* Button used to collapse the left sidebar. Only visible on tablet and desktops */}
            <a
              href=""
              className="nav-link d-none d-md-block d-lg-block d-xl-block"
              onClick={toggleCollapsed}
            >
              <em className="fas fa-bars"></em>
            </a>
            {/* Button to show/hide the sidebar on mobile. Visible on mobile only. */}
            <a
              href=""
              className="nav-link sidebar-toggle d-md-none"
              onClick={toggleAside}
            >
              <em className="fas fa-bars"></em>
            </a>
          </li>
          {/* START lock screen */}
          <li className="nav-item d-none d-md-block">
            <Link
              to={ROUTES.public.login}
              title={formatMessage(messages.logout)}
              className="nav-link"
              onClick={logout}
            >
              <em className="icon-logout"></em>
            </Link>
          </li>

          <li className="nav-item">
            <ClienBranchSelection />
          </li>
          {/* END lock screen */}
        </ul>
        {/* END Left navbar */}
        {/* START Right Navbar */}
        {/* END Right Navbar */}

        {/* START Search form */}
        <form className="navbar-form" role="search" action="search.html">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Type and hit enter ..."
            />
            <div
              className="fa fa-times navbar-form-close"
              data-search-dismiss=""
            ></div>
          </div>
          <button className="d-none" type="submit">
            Submit
          </button>
        </form>
        {/* END Search form */}
      </nav>
      {/* END Top Navbar */}
    </header>
  );
}

// class Header extends Component {

//   componentDidMount() {
//     HeaderRun();
//   }

//   toggleOffsidebar = (e) => {
//     e.preventDefault();
//     this.props.actions.toggleSetting('offsidebarOpen');
//   };

//   toggleCollapsed = (e) => {
//     e.preventDefault();
//     this.props.actions.toggleSetting('isCollapsed');
//     this.resize();
//   };

//   resize() {
//     // all IE friendly dispatchEvent
//     var evt = document.createEvent('UIEvents');
//     evt.initUIEvent('resize', true, false, window, 0);
//     window.dispatchEvent(evt);
//     // modern dispatchEvent way
//     // window.dispatchEvent(new Event('resize'));
//   }

//   render() {
//     ;
//   }
// }

// Header.propTypes = {
//   actions: PropTypes.object,
//   settings: PropTypes.object,
// };

// const mapStateToProps = (state) => ({ settings: state.settings });
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(actions, dispatch),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
